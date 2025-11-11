import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: '무료',
      price: '0',
      description: 'API 키만 있으면 바로 시작',
      features: [
        '무제한 이미지 생성',
        '기본 프롬프트 최적화',
        '개인 API 키 사용',
        '커뮤니티 지원',
      ],
      cta: '지금 시작하기',
      highlighted: false,
    },
    {
      name: '프로',
      price: '29,000',
      description: '전문가를 위한 완벽한 솔루션',
      features: [
        '무료 플랜의 모든 기능',
        '고급 프롬프트 템플릿',
        'n8n 워크플로우 통합',
        '1:1 화상 세팅 지원',
        '우선 기술 지원',
      ],
      cta: '프로로 업그레이드',
      highlighted: true,
    },
    {
      name: '기업',
      price: '상담',
      description: '맞춤형 솔루션이 필요하신가요?',
      features: [
        '프로 플랜의 모든 기능',
        '전용 계정 관리자',
        '맞춤형 워크플로우 구축',
        '온사이트 교육',
        '24/7 전담 지원',
      ],
      cta: '문의하기',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            요금제
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            당신의 비즈니스에 딱 맞는 플랜을 선택하세요
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-slate-800/50 p-8 rounded-2xl border transition-all hover:scale-105 ${
                plan.highlighted
                  ? 'border-indigo-500 shadow-xl shadow-indigo-500/20'
                  : 'border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    인기
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  {plan.price === '상담' ? (
                    <span className="text-4xl font-bold text-white">상담 필요</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">원/월</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.name === '무료' ? '/generator' : '#'}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            자주 묻는 질문
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                API 키는 어떻게 발급받나요?
              </h3>
              <p className="text-gray-400">
                Google AI Studio에서 무료로 API 키를 발급받을 수 있습니다. 
                발급 후 생성기 페이지에서 입력하시면 바로 사용 가능합니다.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                무료 플랜에 제한이 있나요?
              </h3>
              <p className="text-gray-400">
                무료 플랜은 Google AI의 무료 할당량을 사용합니다. 
                일일 요청 횟수에 제한이 있을 수 있으며, 더 많은 사용이 필요하다면 
                프로 플랜 업그레이드를 추천드립니다.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                환불 정책은 어떻게 되나요?
              </h3>
              <p className="text-gray-400">
                프로 플랜은 구매 후 7일 이내 전액 환불이 가능합니다. 
                단, 기업 플랜은 계약 조건에 따라 다를 수 있습니다.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                플랜은 언제든 변경 가능한가요?
              </h3>
              <p className="text-gray-400">
                네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 
                변경 사항은 즉시 적용되며, 요금은 일할 계산됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            아직 고민 중이신가요?
          </h2>
          <p className="text-indigo-100 mb-8">
            무료로 시작해서 우리 서비스를 직접 체험해보세요
          </p>
          <Link
            to="/generator"
            className="inline-block px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
