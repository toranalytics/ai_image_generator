import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-white font-semibold text-lg">
                AI 상품 이미지 생성기
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI 기술로 쇼핑몰 상품 이미지를 자동 생성하여<br />
              마케팅 효율을 극대화하세요.
            </p>
            <p className="text-gray-500 text-xs">
              © 2024 AI 상품 이미지 생성기. All rights reserved.
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="text-white font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                  요금제
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-gray-400 hover:text-white text-sm transition-colors">
                  무료 체험
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <div>
            <h3 className="text-white font-semibold mb-4">법적 고지</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <a href="mailto:support@example.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
