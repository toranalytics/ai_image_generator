# AI 상품 이미지 생성기

AI 기술로 쇼핑몰 상품 이미지를 자동 생성하는 웹 애플리케이션입니다.

## 🚀 주요 기능

- 🎨 **AI 기반 이미지 자동 생성** - 여러 장의 상품 이미지 일괄 생성
- 👤 **모델 레퍼런스** - 특정 모델의 얼굴과 스타일을 지정
- 🖼️ **배경 레퍼런스** - 원하는 배경 분위기 설정
- 🎨 **색상 베리에이션** - 여러 색상의 제품 이미지 자동 생성
- 👥 **인물 설정** - 성별, 연령대 선택 가능
- 📸 **8가지 샷 타입** - 전신/클로즈업/측면/후면 등 다양한 각도
- 📊 **진행률 표시** - 실시간 생성 진행 상황 확인
- 💾 **ZIP 다운로드** - 모든 이미지를 한 번에 다운로드
- 📱 **반응형 디자인** - 모바일/태블릿/데스크톱 지원

## 🛠️ 기술 스택

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- **Google GenAI (나노바나나)** - Gemini 2.5 Flash Image Preview
- JSZip

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

## 🌐 Vercel 배포

### 방법 1: CLI로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동

1. GitHub에 저장소 생성 및 푸시
2. [Vercel](https://vercel.com)에 접속
3. "Import Project" 클릭
4. GitHub 저장소 선택
5. 자동 배포 시작

## 🔑 API 키 발급

1. [Google AI Studio](https://aistudio.google.com/apikey) 접속
2. "Create API Key" 클릭
3. 발급받은 키를 애플리케이션에서 입력

## 📁 프로젝트 구조

```
ai-image-generator/
├── src/
│   ├── components/       # 공통 컴포넌트
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── icons.tsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Pricing.tsx
│   │   ├── Generator.tsx
│   │   ├── Terms.tsx
│   │   └── Privacy.tsx
│   ├── types.ts         # TypeScript 타입 정의
│   ├── App.tsx          # 메인 앱 (라우터)
│   ├── main.tsx         # 진입점
│   └── index.css        # 글로벌 스타일
├── public/              # 정적 파일
├── index.html
├── package.json
└── vite.config.ts
```

## 🎯 사용 방법

1. **API 키 입력**: Google AI API 키를 입력합니다
2. **이미지 업로드**: 드래그 앤 드롭 또는 클릭으로 이미지를 업로드합니다
3. **프롬프트 입력**: 각 이미지에 대한 생성 프롬프트를 입력합니다
4. **이미지 생성**: "이미지 생성하기" 버튼을 클릭합니다
5. **다운로드**: 생성된 이미지를 ZIP 파일로 다운로드합니다

## ⚠️ 주의사항

- API 키는 브라우저에만 저장되며 서버로 전송되지 않습니다
- Google AI의 무료 할당량에는 일일 요청 제한이 있을 수 있습니다
- 업로드된 이미지는 처리 후 즉시 삭제됩니다

## 📄 라이선스

MIT License

## 👥 기여

이슈 및 PR을 환영합니다!

## 📧 문의

support@example.com
