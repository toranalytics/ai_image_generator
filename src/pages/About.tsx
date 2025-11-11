import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            서비스 소개
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI 기술로 쇼핑몰 마케팅을 혁신하는 완전 자동화 솔루션
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">우리의 미션</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              쇼핑몰 운영자들이 마케팅 콘텐츠 제작에 소비하는 시간과 비용을 혁신적으로 줄이는 것이 우리의 목표입니다.
            </p>
            <p className="text-gray-300 leading-relaxed">
              AI 기술을 활용하여 누구나 쉽고 빠르게 고품질의 상품 이미지를 생성할 수 있도록 돕습니다.
            </p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">핵심 가치</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">✓</span>
                <span className="text-gray-300">
                  <strong className="text-white">효율성:</strong> 3시간 작업을 10분으로 단축
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">✓</span>
                <span className="text-gray-300">
                  <strong className="text-white">접근성:</strong> 누구나 쉽게 사용 가능
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">✓</span>
                <span className="text-gray-300">
                  <strong className="text-white">품질:</strong> 전문가 수준의 결과물
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            사용 기술
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Google Gemini</h3>
              <p className="text-gray-400 text-sm">
                최신 AI 모델로 이미지 생성 및 프롬프트 최적화
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">React + TypeScript</h3>
              <p className="text-gray-400 text-sm">
                안정적이고 빠른 웹 애플리케이션 구조
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tailwind CSS</h3>
              <p className="text-gray-400 text-sm">
                현대적이고 반응형인 UI/UX 디자인
              </p>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            워크플로우
          </h2>
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">리뷰 분석</h3>
                  <p className="text-gray-400">
                    고객 리뷰를 AI가 분석하여 핵심 키워드를 추출합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">문구 생성</h3>
                  <p className="text-gray-400">
                    상세페이지 규격에 맞는 매력적인 마케팅 문구를 자동 생성합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">이미지 생성</h3>
                  <p className="text-gray-400">
                    AI가 고품질 상품 이미지를 자동으로 생성합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">자동 삽입</h3>
                  <p className="text-gray-400">
                    생성된 문구와 이미지를 템플릿에 자동으로 삽입합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            활용 사례
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">쇼핑몰 운영자</h3>
              <p className="text-gray-300 mb-4">
                매일 수십 개의 상품 상세페이지를 제작해야 하는 운영자님들께 최적화된 솔루션입니다.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• 작업 시간 90% 단축</li>
                <li>• 디자이너 비용 절감</li>
                <li>• 일관된 품질 유지</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">마케터</h3>
              <p className="text-gray-300 mb-4">
                빠른 A/B 테스트와 다양한 마케팅 소재 제작이 필요한 마케터님들을 위한 도구입니다.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• 다양한 버전 즉시 생성</li>
                <li>• 신속한 시장 반응 테스트</li>
                <li>• 캠페인 효율 극대화</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 체험해보세요
          </h2>
          <p className="text-indigo-100 mb-8">
            무료로 시작하여 AI의 힘을 직접 경험하세요
          </p>
          <Link
            to="/generator"
            className="inline-block px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            무료 체험 시작하기 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
