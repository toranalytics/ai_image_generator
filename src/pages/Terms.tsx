const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8">이용약관</h1>
        
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제1조 (목적)</h2>
            <p className="text-gray-300 leading-relaxed">
              본 약관은 AI 상품 이미지 생성기(이하 "서비스"라 합니다)의 이용과 관련하여 
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제2조 (정의)</h2>
            <div className="space-y-3 text-gray-300">
              <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>"서비스"란 회사가 제공하는 AI 기반 이미지 생성 플랫폼을 의미합니다.</li>
                <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
                <li>"API 키"란 Google AI Studio에서 발급받은 인증 키를 의미합니다.</li>
                <li>"콘텐츠"란 이용자가 서비스를 이용하여 생성한 이미지 및 관련 데이터를 의미합니다.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제3조 (약관의 효력 및 변경)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</p>
              <p>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.</p>
              <p>③ 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제4조 (서비스의 제공)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 다음과 같은 서비스를 제공합니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>AI 기반 이미지 생성 서비스</li>
                <li>프롬프트 최적화 서비스</li>
                <li>생성된 이미지 다운로드 서비스</li>
              </ol>
              <p>② 회사는 서비스의 내용 및 제공 방식을 변경할 수 있으며, 변경 시 사전에 공지합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제5조 (서비스의 중단)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있습니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>시스템 점검, 보수, 교체 또는 고장, 통신 두절 등의 사유가 발생한 경우</li>
                <li>천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
                <li>Google AI API의 서비스 중단 또는 장애가 발생한 경우</li>
              </ol>
              <p>② 회사는 서비스 중단 시 사전에 공지하며, 불가피한 경우 사후에 공지할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제6조 (이용자의 의무)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
              </ol>
              <p>② 이용자는 본인의 API 키를 안전하게 관리할 책임이 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제7조 (저작권의 귀속)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 서비스를 통해 생성된 이미지의 저작권은 이용자에게 귀속됩니다.</p>
              <p>② 회사는 생성된 이미지를 서비스 개선 목적으로만 사용하며, 이용자의 동의 없이 제3자에게 제공하지 않습니다.</p>
              <p>③ 서비스의 디자인, 로고, 소스코드 등에 대한 저작권은 회사에 귀속됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제8조 (면책조항)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
              <p>② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</p>
              <p>③ 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.</p>
              <p>④ 회사는 Google AI API의 오류, 중단 등으로 인한 서비스 장애에 대해 책임을 지지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">제9조 (준거법 및 재판관할)</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 본 약관과 관련된 사항에 대하여는 대한민국 법을 준거법으로 합니다.</p>
              <p>② 서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">부칙</h2>
            <p className="text-gray-300">본 약관은 2024년 1월 1일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
