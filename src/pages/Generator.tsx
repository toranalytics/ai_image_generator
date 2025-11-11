import { useState, useRef } from 'react';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import JSZip from 'jszip';
import { UploadedImage } from '../types';
import { UploadIcon, LoadingSpinner, ErrorIcon, CloseIcon, ChevronDownIcon, DownloadCloudIcon } from '../components/icons';

const Generator = () => {
  const [apiKey, setApiKey] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      prompt: '',
      enhancedPrompt: '',
      generatedImages: [],
      isGenerating: false,
      error: null,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handlePromptChange = (id: string, prompt: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, prompt } : img))
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return updated;
    });
  };

  const generateImages = async () => {
    if (!apiKey.trim()) {
      alert('API 키를 입력해주세요.');
      return;
    }

    if (images.length === 0) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    const hasEmptyPrompts = images.some((img) => !img.prompt.trim());
    if (hasEmptyPrompts) {
      alert('모든 이미지에 프롬프트를 입력해주세요.');
      return;
    }

    setIsGenerating(true);

    try {
      const ai = new GoogleGenerativeAI(apiKey);

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? { ...img, isGenerating: true, error: null }
              : img
          )
        );

        try {
          const imageData = await fileToBase64(image.file);
          const mimeType = image.file.type;

          const model = ai.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
          });

          const promptEnhancementParts: Part[] = [
            {
              inlineData: {
                data: imageData.split(',')[1],
                mimeType: mimeType,
              },
            },
            {
              text: `당신은 전문 AI 이미지 생성 프롬프트 엔지니어입니다.

사용자가 제공한 이미지와 기본 프롬프트를 분석하여, 이미지 생성 AI가 더 나은 결과물을 만들 수 있도록 프롬프트를 개선해주세요.

기본 프롬프트: "${image.prompt}"

다음 가이드라인을 따라주세요:
1. 이미지의 주요 요소, 색상, 스타일을 분석
2. 기본 프롬프트의 의도를 파악
3. 더 구체적이고 상세한 설명 추가
4. 이미지 생성에 적합한 기술적 용어 포함
5. 결과는 영문으로 작성
6. 200단어 이내로 작성

개선된 프롬프트만 출력하고, 다른 설명은 포함하지 마세요.`,
            },
          ];

          const enhancementResult = await model.generateContent(
            promptEnhancementParts
          );
          const enhancedPrompt = enhancementResult.response.text().trim();

          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id ? { ...img, enhancedPrompt } : img
            )
          );

          const imageGenModel = ai.getGenerativeModel({
            model: 'imagen-3.0-generate-001',
          });

          const imageGenPrompt = `${enhancedPrompt}

Technical requirements:
- High resolution
- Professional quality
- Clean composition
- Suitable for e-commerce/marketing`;

          const generationResult = await imageGenModel.generateContent(
            imageGenPrompt
          );

          const generatedImages: string[] = [];
          const candidates = generationResult.response.candidates || [];

          for (const candidate of candidates) {
            if (candidate.content && candidate.content.parts) {
              for (const part of candidate.content.parts) {
                if (
                  'inlineData' in part &&
                  part.inlineData &&
                  part.inlineData.data
                ) {
                  const base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                  generatedImages.push(base64Image);
                }
              }
            }
          }

          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? {
                    ...img,
                    generatedImages,
                    isGenerating: false,
                  }
                : img
            )
          );

          await new Promise<void>((resolve) => {
            setTimeout(resolve, 1000);
          });
        } catch (error: unknown) {
          console.error('Image generation error:', error);
          const errorMessage =
            error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? {
                    ...img,
                    isGenerating: false,
                    error: errorMessage,
                  }
                : img
            )
          );
        }
      }
    } catch (error: unknown) {
      console.error('Generation error:', error);
      alert(
        `이미지 생성 중 오류가 발생했습니다. ${
          error instanceof Error ? error.message : ''
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const base64ToBlob = (base64: string): Blob => {
    const parts = base64.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(parts[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  };

  const downloadAllImages = async () => {
    const zip = new JSZip();

    images.forEach((image, imgIndex) => {
      if (image.generatedImages.length > 0) {
        const folder = zip.folder(`image_${imgIndex + 1}`);
        if (!folder) return;

        image.generatedImages.forEach((genImg, genIndex) => {
          const blob = base64ToBlob(genImg);
          folder.file(`generated_${genIndex + 1}.png`, blob);
        });
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasGeneratedImages = images.some((img) => img.generatedImages.length > 0);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI 상품 이미지 생성기
          </h1>
          <p className="text-gray-400 text-lg">
            이미지를 업로드하고 프롬프트를 입력하면 AI가 자동으로 상품 이미지를 생성합니다
          </p>
        </div>

        {/* API Key Input */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
          <label className="block text-white font-semibold mb-3">
            Google AI API 키 입력
          </label>
          <div className="flex gap-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API 키를 입력하세요"
              className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              API 키 발급받기
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Google AI Studio에서 무료로 API 키를 발급받을 수 있습니다
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors mb-8"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <UploadIcon />
          <p className="text-white text-lg font-semibold mt-4 mb-2">
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-gray-400 text-sm">
            PNG, JPG, WEBP 파일 지원 (최대 10MB)
          </p>
        </div>

        {/* Uploaded Images */}
        {images.length > 0 && (
          <div className="space-y-6 mb-8">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2">
                          {image.file.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {(image.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <textarea
                      value={image.prompt}
                      onChange={(e) =>
                        handlePromptChange(image.id, e.target.value)
                      }
                      placeholder="이 이미지로 생성하고 싶은 콘텐츠를 설명하세요..."
                      className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
                      disabled={image.isGenerating}
                    />

                    {image.enhancedPrompt && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleDropdown(image.id)}
                          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <span className="text-sm font-semibold">
                            개선된 프롬프트 보기
                          </span>
                          <ChevronDownIcon />
                        </button>
                        {openDropdowns.has(image.id) && (
                          <div className="mt-2 p-4 bg-slate-700 rounded-lg">
                            <p className="text-gray-300 text-sm whitespace-pre-wrap">
                              {image.enhancedPrompt}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {image.isGenerating && (
                      <div className="mt-4 flex items-center gap-3 text-indigo-400">
                        <LoadingSpinner />
                        <span className="text-sm font-semibold">
                          이미지 생성 중...
                        </span>
                      </div>
                    )}

                    {image.error && (
                      <div className="mt-4 flex items-start gap-3 text-red-400 bg-red-900/20 p-4 rounded-lg">
                        <ErrorIcon />
                        <span className="text-sm">{image.error}</span>
                      </div>
                    )}

                    {image.generatedImages.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-white font-semibold mb-4">
                          생성된 이미지 ({image.generatedImages.length}개)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {image.generatedImages.map((genImg, idx) => (
                            <img
                              key={idx}
                              src={genImg}
                              alt={`Generated ${idx + 1}`}
                              className="w-full aspect-square object-cover rounded-lg border border-slate-600"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {images.length > 0 && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={generateImages}
              disabled={isGenerating}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-3"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner />
                  생성 중...
                </>
              ) : (
                '이미지 생성하기'
              )}
            </button>

            {hasGeneratedImages && (
              <button
                onClick={downloadAllImages}
                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors flex items-center gap-3"
              >
                <DownloadCloudIcon />
                모든 이미지 다운로드 (ZIP)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
