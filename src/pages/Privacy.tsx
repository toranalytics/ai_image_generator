const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8">개인정보처리방침</h1>
        
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 space-y-8">
          <section>
            <p className="text-gray-300 leading-relaxed mb-4">
              AI 상품 이미지 생성기(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 
              개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 
              개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. 개인정보의 수집 및 이용목적</h2>
            <div className="space-y-3 text-gray-300">
              <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                <li>회원관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지</li>
                <li>마케팅 및 광고에 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공</li>
                <li>서비스 개선 및 통계 분석</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. 수집하는 개인정보의 항목</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 최소한의 개인정보만을 수집합니다:</p>
              <div className="pl-4">
                <p className="font-semibold text-white mb-2">필수항목:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>API 키 (암호화하여 브라우저에 임시 저장, 서버 전송 없음)</li>
                  <li>업로드한 이미지 파일 (일시적 처리 후 즉시 삭제)</li>
                  <li>입력한 프롬프트 텍스트</li>
                </ul>
                <p className="font-semibold text-white mb-2 mt-4">자동 수집 항목:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>IP 주소</li>
                  <li>쿠키</li>
                  <li>서비스 이용 기록</li>
                  <li>기기 정보</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. 개인정보의 보유 및 이용기간</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 이용자의 개인정보를 다음과 같이 처리합니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>API 키: 브라우저 세션 동안만 메모리에 보관, 서버 저장 없음</li>
                <li>업로드 이미지: 이미지 생성 처리 후 즉시 삭제</li>
                <li>생성된 이미지: 이용자의 브라우저에만 보관, 서버 저장 없음</li>
                <li>서비스 이용 기록: 법령에서 정한 기간 동안 보관</li>
              </ul>
              <p>② 법령에 따른 보관:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                <li>웹사이트 방문기록: 3개월</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. 개인정보의 제3자 제공</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
              <p>② 다만, 다음의 경우에는 예외로 합니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
              <p>③ Google AI API 사용:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>이미지 생성을 위해 Google AI API를 사용합니다</li>
                <li>업로드된 이미지와 프롬프트는 Google AI API로 전송됩니다</li>
                <li>Google의 개인정보처리방침은 별도로 적용됩니다</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. 개인정보 처리의 위탁</h2>
            <div className="space-y-3 text-gray-300">
              <p>회사는 서비스 향상을 위해 다음과 같이 개인정보 처리업무를 외부에 위탁하고 있습니다:</p>
              <div className="pl-4">
                <p className="font-semibold text-white">수탁업체: Google LLC</p>
                <p>위탁업무 내용: AI 이미지 생성 서비스 제공</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. 이용자의 권리와 행사방법</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>개인정보 열람 요구</li>
                <li>오류 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
              <p>② 권리 행사는 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. 개인정보의 파기</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
              <p>② 파기 방법:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>전자적 파일 형태: 복구 및 재생되지 않도록 안전하게 삭제</li>
                <li>기록물, 인쇄물, 서면: 분쇄하거나 소각</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. 개인정보 보호책임자</h2>
            <div className="space-y-3 text-gray-300">
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <div className="pl-4 mt-4">
                <p className="font-semibold text-white">개인정보 보호책임자</p>
                <p>이메일: support@example.com</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. 개인정보의 안전성 확보조치</h2>
            <div className="space-y-3 text-gray-300">
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>개인정보 취급 직원의 최소화 및 교육</li>
                <li>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위한 보안프로그램 설치</li>
                <li>개인정보를 안전하게 저장·전송할 수 있는 암호화 조치</li>
                <li>접근통제를 위한 기술적 조치</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. 개인정보처리방침의 변경</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.</p>
              <p>② 이전의 개인정보처리방침은 아래에서 확인할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. 쿠키의 운영</h2>
            <div className="space-y-3 text-gray-300">
              <p>① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
              <p>② 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</p>
              <p>③ 쿠키의 사용 목적: 이용자의 서비스 이용 패턴을 파악하여 보다 나은 서비스를 제공하기 위해 사용됩니다.</p>
              <p>④ 쿠키의 설정 거부 방법: 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 브라우저 옵션 설정을 통해 쿠키를 거부할 수 있으나, 쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
