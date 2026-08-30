# 📘 github-pages Workspace Instructions

본 워크스페이스는 기술 블로그 및 강의용 HTML 문서를 관리합니다. 모든 에이전트 작업 시 다음 상시 표준을 최우선 준수해야 합니다.

## 🚨 3대 절대 금지 규칙
1. **전역 폰트 강제 주입 금지**: `font-size: max(...) !important` 등 전역 CSS 오버라이드 엄금. 마스터 템플릿의 폰트 계층 보존.
2. **SVG 1:1 무축소/무확대 제로 스케일링**: 부모 컨테이너 폭(`710px`, `780px`, `1240px`)과 SVG `viewBox` 너비 1:1 완전 일치.
3. **SVG `<text>` 내부 HTML 태그 금지**: `<text>` 내 `<sub>`, `<sup>`, `<div>` 삽입 금지. Unicode 특수문자 직접 사용.

- 격식 있고 정갈한 **기술 문어체 평서형(`~한다.`, `~이다.`, `~있다.`)**으로 본문 서술 (`~합니다`, `~입니다`, `~함`, `~임` 절대 금지).
- **목록형/카드/표 텍스트**: 불릿 목록(`<ul><li>`), 비교 카드 항목, 표 내부 텍스트는 **간결한 명사형 종결(예: `~연산 불가`, `~직접 연결`)**로 마무리.
- **기본 텍스트(Base Text, 16px) 및 타이포그래피 5단계 계층 원칙**:
  - **Level 1 (대제목, 24~28px, h2)**: 섹션/장 시작 및 주제 선언.
  - **Level 2 (중제목, 18px, h5)**: 상위 카드/컨테이너 그룹 제목.
  - **Level 3 (기본 텍스트, 16px ★)**: 본문 설명 문장(`<p>`), 상/하위 카드 본문, 원리 설명, 결론 화살표 요약 등 **모든 읽는 텍스트의 절대적 하한선(Floor)**.
  - **Level 4 (보조/분류 라벨, 14px, text-secondary)**: 카드 상단 카테고리(`문맥 A`, `Head 1`), 메타데이터.
  - **Level 5 (배지/상태, 12px)**: 상태 배지 태그(단독 문장 서술 사용 금지).
- **중첩 카드(Nested Cards) 설계 원칙**:
  - 카드가 2~3단계로 중첩되더라도 **본문 폰트 크기(16px) 축소 절대 금지**.
  - 계층 구분은 폰트 축소가 아닌 **제목(18px ➔ 16px)과 컨테이너 배경색(흰색 bg-white ➔ 연회색 bg-light/테마 서브컬러)**의 대비로 표현한다.
  - 문장 내 핵심 키워드 인라인 강조 시 글자가 작아지는 `.badge` 사용을 지양하고, **주변 텍스트 크기를 100% 동일하게 유지하는 하이라이트(Bold + 배경색 패딩)**를 적용한다.
- **공통 표준 에셋 참조 원칙 (standards.css & standards.js)**:
  - 모든 HTML 문서는 개별 인라인 `<style>` 및 중복 스크립트 남발을 지양하고, 마스터 스타일시트 **`<link rel="stylesheet" href="/css/standards.css">`**와 마스터 공통 스크립트 **`<script src="/js/standards.js"></script>`**(또는 상대경로)를 반드시 최우선 참조한다.
  - 카드 및 하이라이트 작성 시 `.card-parent`, `.card-nested`, `.kw-highlight` 등 표준 시맨틱 클래스를 적극 활용한다.
  - Highlight.js 구동, `copyCode()` 원클릭 복사, Iframe `sendHeight()` 높이 자동 동기화는 `standards.js`에서 통합 처리하므로 개별 문서에 중복 인라인 JS를 작성하지 않는다.
- 주요 기술 용어 첫 등장 시 `한글(English, Symbol)` 병기 (예: `은닉 상태(Hidden State, h)`).
- LaTeX(`$...$`) 사용 금지 ➔ HTML 태그(`<sub>`, `<sup>`, `<code>`) 및 Unicode 사용.

- SVG 제작 시 백지 작성을 금지하고 가급적 [svg_templates.html](.agents/skills/style-standards/resources/svg_templates.html) 표준 블록을 기반으로 조합한다.

