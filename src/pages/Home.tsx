import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-semibold mb-6">
              🚀 AI 기반 자동화 솔루션
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            쇼핑몰 상품 이미지,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
              10분만에 자동 생성
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            리뷰 분석부터 문구 작성, 이미지 생성까지.<br />
            AI가 모든 과정을 자동화하여 마케팅 효율을 극대화합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              무료로 시작하기
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold text-lg transition-all"
            >
              자세히 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            왜 우리 서비스인가요?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-slate-600 hover:border-indigo-500 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">빠른 생성 속도</h3>
              <p className="text-gray-400">
                기존 3시간 작업을 10분으로 단축. AI가 즉시 고품질 이미지를 생성합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-slate-600 hover:border-indigo-500 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">쉬운 사용법</h3>
              <p className="text-gray-400">
                복잡한 설정 없이 이미지와 프롬프트만 입력하면 끝. 누구나 쉽게 사용할 수 있습니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-slate-600 hover:border-indigo-500 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">합리적인 가격</h3>
              <p className="text-gray-400">
                API 키만 있으면 무료 사용 가능. 추가 비용 없이 무제한 생성하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            어떻게 작동하나요?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">이미지 업로드</h3>
              <p className="text-gray-400 text-sm">
                원본 상품 이미지를 드래그 앤 드롭으로 업로드하세요.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">프롬프트 입력</h3>
              <p className="text-gray-400 text-sm">
                원하는 이미지 스타일과 콘셉트를 설명하세요.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI 생성</h3>
              <p className="text-gray-400 text-sm">
                AI가 자동으로 고품질 이미지를 생성합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">다운로드</h3>
              <p className="text-gray-400 text-sm">
                생성된 이미지를 ZIP 파일로 다운로드하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            첫 달 무료 체험으로 AI의 힘을 경험해보세요.
          </p>
          <Link
            to="/generator"
            className="inline-block px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
