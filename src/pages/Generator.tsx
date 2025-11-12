import React, { useState, useCallback, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import JSZip from 'jszip';
import { UploadedImage } from '../types';
import { UploadIcon, LoadingSpinner, ErrorIcon, CloseIcon, ChevronDownIcon, DownloadCloudIcon } from '../components/icons';

const Generator: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [modelRefImage, setModelRefImage] = useState<UploadedImage | null>(null);
  const [backgroundRefImage, setBackgroundRefImage] = useState<UploadedImage | null>(null);
  const [colorVariations, setColorVariations] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [numImages, setNumImages] = useState<number>(3);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isSystemInstructionOpen, setIsSystemInstructionOpen] = useState(false);

  const [includePerson, setIncludePerson] = useState<boolean>(true);
  const [modelGender, setModelGender] = useState<string>('여성');
  const [modelAge, setModelAge] = useState<string>('20대');

  const defaultPrompt = '깨끗하고 미니멀한 흰색 배경의 제품 컷';
  const genders = ['여성', '남성'];
  const ageRanges = ['10대', '20대', '30대', '40대', '50대'];

  const ai = useMemo(() => {
    if (!apiKey.trim()) return null;
    try {
      return new GoogleGenerativeAI(apiKey);
    } catch (e) {
      console.error("AI Initialization Error:", e);
      setError(`API 키 초기화 중 오류가 발생했습니다. 키가 유효한지 확인해주세요. (${e instanceof Error ? e.message : String(e)})`);
      return null;
    }
  }, [apiKey]);

  const handleSingleImageUpload = (file: File, setter: React.Dispatch<React.SetStateAction<UploadedImage | null>>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setter({
        id: `${file.name}-${Date.now()}`,
        file,
        base64: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleMultiImageUpload = (files: FileList) => {
    const newImages: UploadedImage[] = [];
    const promises = Array.from(files).map(file => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: `${file.name}-${Date.now()}`,
            file,
            base64: e.target?.result as string,
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(() => {
      setUploadedImages(prev => [...prev, ...newImages]);
    });
  };

  const handleDownloadAll = async () => {
    if (generatedImages.length === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      generatedImages.forEach((src, index) => {
        const base64Data = src.split(',')[1];
        zip.file(`generated-image-${index + 1}.png`, base64Data, { base64: true });
      });
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'generated-images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (e) {
      setError(`ZIP 파일 생성 중 오류가 발생했습니다: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsZipping(false);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!apiKey.trim() || !ai) {
      setError('API 키를 먼저 입력해주세요.');
      return;
    }
    if (uploadedImages.length === 0) {
      setError('상품 이미지를 최소 1개 이상 업로드해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setCompletedCount(0);
    setProgress(0);

    const shotTypes = [
      '모델이 제품을 착용한 전신 정면 컷', 
      '제품의 질감과 디테일이 잘 보이는 클로즈업 컷', 
      '모델이 제품을 착용한 자연스러운 측면 컷',
      '제품의 특징을 강조하는 상반신 컷 (토르소 샷)', 
      '모델이 제품을 착용한 후면 컷', 
      '제품을 사용하는 모습을 보여주는 라이프스타일 컷',
      '다른 각도에서 본 제품 디테일 컷', 
      '제품과 함께 소품을 활용한 감성적인 연출 컷'
    ];
    
    const colors = colorVariations.split(',').map(c => c.trim()).filter(Boolean);

    // 상품 이미지들을 Parts로 변환
    const productParts: any[] = uploadedImages.map(img => ({
      inlineData: { 
        data: img.base64.split(',')[1], 
        mimeType: img.file.type 
      },
    }));

    // 레퍼런스 이미지 Parts 생성
    const referenceParts: any[] = [];
    if (modelRefImage) {
      referenceParts.push(
        { text: '[모델 레퍼런스 이미지]' }, 
        { inlineData: { 
          data: modelRefImage.base64.split(',')[1], 
          mimeType: modelRefImage.file.type 
        }}
      );
    }
    if (backgroundRefImage) {
      referenceParts.push(
        { text: '[배경 레퍼런스 이미지]' }, 
        { inlineData: { 
          data: backgroundRefImage.base64.split(',')[1], 
          mimeType: backgroundRefImage.file.type 
        }}
      );
    }

    let errorsEncountered = 0;

    for (let i = 0; i < numImages; i++) {
      const shotType = shotTypes[i % shotTypes.length];
      const currentColor = colors.length > 0 ? colors[i % colors.length] : null;

      const personRule = includePerson
        ? `반드시 '${modelAge}'으로 보이는 '${modelGender}' 모델을 생성해야 합니다. 다른 연령대로 보이는 인물은 절대 생성해서는 안됩니다. 모든 생성 이미지에 걸쳐 이 모델의 얼굴과 신체 특징은 동일해야 합니다.`
        : '인물은 포함하지 마세요.';
      
      const colorRule = currentColor ? `8. **색상:** 이번 이미지의 제품 색상은 반드시 '${currentColor}' 이어야 합니다.` : '';

      const baseSystemInstruction = `**시스템 안내 (절대 규칙):**
1. **레퍼런스 활용 (최상위 규칙):** 이 규칙은 다른 모든 지시보다 우선합니다.
   - **[모델 레퍼런스]**가 제공된 경우: 생성되는 인물의 얼굴, 헤어스타일, 연령대는 반드시 레퍼런스와 동일해야 합니다.
   - **[배경 레퍼런스]**가 제공된 경우: 배경의 분위기, 색감, 구성을 반드시 레퍼런스와 유사하게 연출해야 합니다.
2. **생성 목적:** 생성될 이미지는 온라인 쇼핑몰의 '상세 페이지'에 사용될 전문가 수준의 제품 사진입니다. 이 목적에 부합하는 고품질 이미지를 생성해야 합니다.
3. **명령: 이미지를 생성하세요.** 텍스트 설명만 반환해서는 안 됩니다.
4. **모델 외형 (엄격한 규칙):** 이 규칙은 절대적입니다. ${personRule}
5. **기반:** 제공된 [사용자 업로드 이미지]를 기반으로 이미지를 수정하거나 새로운 장면을 연출하세요.`;
      
      const finalPrompt = `${baseSystemInstruction}
6. **이번 이미지의 역할:** 전체 ${numImages}개의 이미지 세트 중, 이번에는 '${shotType}'을 생성할 차례입니다. 이 역할에 충실한 이미지를 만들어주세요.
${colorRule}
7. **반영:** 아래 [사용자 요청사항]을 창의적으로 해석하여 결과물에 반영하세요.

**사용자 요청사항:**
- 상세 내용: ${prompt || defaultPrompt}`;

      // 최종 Parts: 상품이미지 + 레퍼런스 + 프롬프트
      const requestParts: any[] = [...productParts, ...referenceParts, { text: finalPrompt }];

      try {
        const model = ai.getGenerativeModel({ 
          model: 'gemini-2.5-flash-image'
        });

        const result = await model.generateContent(requestParts);

        let imageFound = false;
        if (result.response?.candidates && result.response.candidates.length > 0) {
          for (const part of result.response.candidates[0].content.parts) {
            if ('inlineData' in part && part.inlineData) {
              const newImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
              setGeneratedImages(prev => [...prev, newImage]);
              imageFound = true;
              break; 
            }
          }
        }
        if (!imageFound) errorsEncountered++;
      } catch (e) {
        console.error(`Error generating image ${i + 1}:`, e);
        errorsEncountered++;
        setError(`이미지 생성 중 오류가 발생했습니다. (${e instanceof Error ? e.message : String(e)})`);
      }
      
      await new Promise<void>(resolve => {
        setTimeout(() => {
          const currentCompleted = i + 1;
          setCompletedCount(currentCompleted);
          setProgress((currentCompleted / numImages) * 100);
          resolve();
        }, 0);
      });
    }

    setIsLoading(false);
    if (errorsEncountered > 0 && !error) {
      setError(`총 ${numImages}개 중 ${numImages - errorsEncountered}개의 이미지를 생성했습니다. ${errorsEncountered}개는 생성에 실패했습니다.`);
    }
  }, [ai, apiKey, uploadedImages, prompt, numImages, defaultPrompt, includePerson, modelGender, modelAge, modelRefImage, backgroundRefImage, colorVariations]);

  const systemInstructionForDisplay = useMemo(() => {
    const personRule = includePerson 
      ? `4. **모델 외형 (엄격한 규칙):** 반드시 '${modelAge}'으로 보이는 '${modelGender}' 모델을 생성해야 합니다.`
      : '4. **인물 미포함:** 인물은 포함하지 않습니다.';
    
    return `**시스템 안내 (절대 규칙):**
1. **레퍼런스 활용 (최상위 규칙):** 업로드된 [모델/배경 레퍼런스]의 얼굴, 스타일, 분위기를 절대적으로 반영합니다.
2. **생성 목적:** 쇼핑몰 상세 페이지용 전문가 수준의 제품 사진을 생성합니다.
3. **명령:** 이미지만 생성합니다. (텍스트 출력 금지)
${personRule}
5. **다양성:** '전신 컷', '클로즈업 컷' 등 다양한 역할의 이미지를 순서대로 생성합니다.
6. **색상 베리에이션:** 입력된 색상이 있을 경우, 생성 개수에 맞춰 각 색상의 이미지를 공평하게 생성합니다.`;
  }, [includePerson, modelAge, modelGender]);

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-300 font-sans py-8 px-4">
        <main className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              AI 상품 이미지 생성기
            </h1>
            <p className="mt-3 text-lg text-slate-400">나노바나나로 멋진 쇼핑몰 상세컷을 만들어보세요</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col gap-6 h-fit">
              {/* 1. API Key */}
              <div>
                <label htmlFor="api-key" className="text-lg font-semibold text-slate-200 mb-2 block">1. API 키 설정</label>
                <input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Google AI API 키를 여기에 입력하세요"
                  className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                 <p className="mt-2 text-xs text-slate-500">
                  API 키는 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">Google AI Studio</a>에서 발급받을 수 있습니다.
                </p>
              </div>

              {/* 2. Product Images */}
              <div>
                <label className="text-lg font-semibold text-slate-200 mb-2 block">2. 상품 이미지 업로드</label>
                <div className="mt-2">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg font-semibold text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 p-4 flex justify-center items-center gap-3 border-2 border-dashed border-slate-600">
                    <UploadIcon className="w-6 h-6" />
                    <span>파일 업로드</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={(e) => e.target.files && handleMultiImageUpload(e.target.files)} accept="image/*" />
                  </label>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {uploadedImages.map(image => (
                      <div key={image.id} className="relative group aspect-square">
                        <img src={image.base64} alt={image.file.name} className="w-full h-full object-cover rounded-md" />
                        <button onClick={() => setUploadedImages(prev => prev.filter(img => img.id !== image.id))} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="이미지 제거">
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Reference Settings */}
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">3. 레퍼런스 설정 (선택)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg border-gray-600 p-2">
                    <label htmlFor="model-ref-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      {modelRefImage ? (
                        <div className="relative w-full h-full">
                          <img src={modelRefImage.base64} className="w-full h-full object-cover rounded-md" alt="Model reference" />
                          <button onClick={(e) => { e.preventDefault(); setModelRefImage(null); }} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"><CloseIcon className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <UploadIcon className="w-8 h-8 mx-auto text-gray-500" />
                          <p className="mt-1 text-sm text-gray-400">모델 레퍼런스</p>
                        </div>
                      )}
                      <input id="model-ref-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => e.target.files && handleSingleImageUpload(e.target.files[0], setModelRefImage)} />
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg border-gray-600 p-2">
                    <label htmlFor="bg-ref-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      {backgroundRefImage ? (
                        <div className="relative w-full h-full">
                          <img src={backgroundRefImage.base64} className="w-full h-full object-cover rounded-md" alt="Background reference" />
                          <button onClick={(e) => { e.preventDefault(); setBackgroundRefImage(null); }} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"><CloseIcon className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <UploadIcon className="w-8 h-8 mx-auto text-gray-500" />
                          <p className="mt-1 text-sm text-gray-400">배경 레퍼런스</p>
                        </div>
                      )}
                      <input id="bg-ref-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => e.target.files && handleSingleImageUpload(e.target.files[0], setBackgroundRefImage)} />
                    </label>
                  </div>
                </div>
              </div>
              
              {/* 4. System Instruction */}
              <div>
                <button type="button" className="w-full flex justify-between items-center text-lg font-semibold text-slate-200" onClick={() => setIsSystemInstructionOpen(prev => !prev)} aria-expanded={isSystemInstructionOpen}>
                  <span>4. 시스템 안내 (AI 적용 규칙)</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isSystemInstructionOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSystemInstructionOpen && <div className="mt-2 p-3 bg-slate-900/70 rounded-lg border border-slate-700 text-sm text-slate-400 whitespace-pre-wrap">{systemInstructionForDisplay}</div>}
              </div>

              {/* 5. Generation Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">5. 생성 상세 설정</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="color-variations" className="block text-sm font-medium text-slate-400 mb-1">색상 베리에이션 (쉼표로 구분)</label>
                    <input id="color-variations" value={colorVariations} onChange={e => setColorVariations(e.target.value)} placeholder="예: 빨강, 파랑, 검정" className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-slate-400 mb-1">추가 요청사항</label>
                    <textarea id="prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={defaultPrompt} className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                    {/* [수정 1] <label>을 <span>으로 변경하여 클릭 기능을 없앱니다. */}
                    <span className="font-medium text-slate-300">인물 포함</span>
                    
                    {/* [수정 2] <div>를 <label>로 변경하여 스위치 영역을 클릭 가능하게 만듭니다. */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="include-person" className="sr-only peer" checked={includePerson} onChange={() => setIncludePerson(!includePerson)} />
                        <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  {includePerson && (
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label htmlFor="model-gender" className="block text-sm font-medium text-slate-400 mb-1">성별</label>
                              <select id="model-gender" value={modelGender} onChange={e => setModelGender(e.target.value)} className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                              </select>
                          </div>
                          <div>
                              <label htmlFor="model-age" className="block text-sm font-medium text-slate-400 mb-1">연령대</label>
                              <select id="model-age" value={modelAge} onChange={e => setModelAge(e.target.value)} className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                  {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
                              </select>
                          </div>
                      </div>
                  )}
                  <div>
                    <label htmlFor="num-images" className="block text-sm font-medium text-slate-400 mb-1">생성 개수</label>
                    <input type="number" id="num-images" min="1" max="10" value={numImages} onChange={(e) => setNumImages(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-full bg-slate-700/50 border-0 ring-1 ring-inset ring-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <button onClick={handleGenerate} disabled={isLoading || uploadedImages.length === 0 || !apiKey.trim()} className="w-full flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                {isLoading ? <><LoadingSpinner className="w-5 h-5" /> 생성 중...</> : '이미지 생성'}
              </button>
            </div>

            {/* Results Panel */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col min-h-[400px] lg:min-h-full">
              {isLoading && (
                <div className="w-full text-center mb-6">
                  <p className="text-lg font-semibold text-slate-300">AI가 이미지를 만들고 있어요... ({completedCount}/{numImages})</p>
                  <div className="w-full bg-slate-700 rounded-full h-2.5 mt-3"><div className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-linear" style={{ width: `${progress}%` }}></div></div>
                  <p className="text-slate-400 mt-2 text-sm">결과는 생성되는 즉시 아래에 표시됩니다.</p>
                </div>
              )}
              {!isLoading && error && (
                <div className="text-center text-red-400 max-w-md m-auto"><ErrorIcon className="w-12 h-12 mx-auto text-red-500" /><p className="mt-4 text-lg font-semibold">오류 발생</p><p className="text-sm mt-1">{error}</p></div>
              )}
              {generatedImages.length > 0 && (
                <div className="w-full flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-slate-200">생성 결과</h2>
                    <button onClick={handleDownloadAll} disabled={isZipping || isLoading} className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-300 font-semibold py-2 px-3 rounded-lg transition-colors">
                      {isZipping ? <LoadingSpinner className="w-4 h-4" /> : <DownloadCloudIcon className="w-5 h-5" />}
                      {isZipping ? '압축 중...' : '전체 다운로드'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh] pr-2">
                    {generatedImages.map((src, index) => (
                      <div key={index} className="relative group bg-slate-700/50 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImage(src)}>
                        <img src={src} alt={`생성된 이미지 ${index + 1}`} className="w-full h-full object-contain" />
                         <a href={src} download={`generated-image-${index + 1}.png`} onClick={(e) => e.stopPropagation()} className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="이미지 다운로드">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                         </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isLoading && !error && generatedImages.length === 0 && (
                <div className="text-center text-slate-500 m-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                  <p className="mt-4 text-lg font-medium">생성된 이미지가 여기에 표시됩니다</p>
                  <p className="text-sm">설정을 완료하고 '이미지 생성' 버튼을 누르세요</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <style>{`.animate-fade-in { animation: fadeIn 0.2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
          <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors" aria-label="닫기"><CloseIcon className="w-6 h-6" /></button>
        </div>
      )}
    </>
  );
};

export default Generator;