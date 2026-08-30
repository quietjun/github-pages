---
name: style-standards
description: github-pages 프로젝트의 톤앤매너, 타이포그래피 계층, SVG 1:1 다이어그램 규격 및 품질 검증 도구를 통합 정의한 종합 디자인/스타일 가이드라인입니다.
---

# 🎨 Style Standards — 종합 디자인 & 톤앤매너 규격서

본 스킬은 `github-pages` 프로젝트 내 모든 문서의 시각적 완성도와 문체 일관성을 보장하기 위한 **타이포그래피, SVG 1:1 규격, 톤앤매너 표준**을 통합 정의합니다.

---

## 🚨 3대 절대 금지 규칙 (Hard Prohibitions)

1. **전역 폰트 강제 주입 금지 (`font-size: max(...) !important` 금지)**
   - 전역 CSS 오버라이드 엄금. 마스터 템플릿의 계층화된 폰트 크기를 100% 보존한다.
2. **SVG 1:1 제로 스케일링 (Zero Scale-Down/Up)**
   - SVG `viewBox` 너비는 부모 컨테이너 너비와 **1:1로 100% 일치**해야 한다.
3. **SVG `<text>` 내부 HTML 태그 금지**
   - `<text>` 내 `<sub>`, `<sup>`, `<div>` 삽입 금지 ➔ Unicode 특수문자 직접 작성.

---

## ✍️ 1. 문체 & 톤앤매너 표준 (Tone & Manner)

### 기본 문체 규칙
* **본문 서술 단락(`<p>`)**: 격식 있고 정갈한 **기술 문어체 평서형(`~한다.`, `~이다.`, `~있다.`)** 유지 (`~합니다`, `~입니다`, `~함`, `~임` 절대 금지).
* **목록형/비교 카드/표 내부 (`<ul><li>`, 카드 본문)**: 장황한 서술 대신 **간결한 명사형 종결(예: `~연산 불가`, `~직접 연결`)**로 작성하여 가독성 극대화.
* **기술 용어 표준 병기**: 주요 AI/CS 기술 용어 첫 등장 시 [resources/glossary.json](./resources/glossary.json)을 대조하여 `한글(English, Symbol)` 형식으로 병기.
* **핀포인트 볼드 (Spotlight Bold)**: 핵심 키워드/결론 명사만 볼드 처리 (40자 이상의 긴 문장 볼드 금지).
* **LaTeX 기호 금지**: KaTeX/LaTeX(`$...$`) 대신 HTML 태그(`<sub>`, `<sup>`, `<code>`) 및 Unicode 사용.

---

## 📏 2. 타이포그래피 및 레이아웃 계층 (Typography Scale)

### 5단계 시각적 계층 체계
| 계층 (Level) | 역할 및 요소 | 규격 (Size) | 스타일 및 클래스 |
| :--- | :--- | :---: | :--- |
| **Level 1 (대제목)** | 문서/섹션 제목 (`h1`, `h2`) | **24px ~ 28px** | `fw-bold` (좌측 블루 라인 / 하단 경계선) |
| **Level 2 (중제목)** | 상위 카드 그룹 제목 (`h5`), SVG 대제목 | **18px** (SVG: 16px) | `fw-bold` (`h5`) |
| **Level 3 (기본 텍스트 ★)** | **본문 문장(`<p>`), 상/하위 카드 본문, 핵심 결론** | **16px** (SVG: 14px) | **가독성의 절대적 하한선(Floor)**<br>• 일반: Regular<br>• 인라인 키워드: Bold + 하이라이트 패딩<br>• 결론 요약: Bold + 테마 색상 |
| **Level 4 (보조 라벨)** | 카드 카테고리 라벨(`문맥 A`, `Head 1`), 메타데이터 | **14px** | `text-secondary`, Regular/Medium |
| **Level 5 (배지/상태)** | 상태 태그, 각주 | **12px** | `badge`, `small` (단독 문장 서술 금지) |

### 중첩 카드 (Nested Cards) 3대 설계 원칙
1. **글자 크기 하한선 불변 (Floor Rule)**: 카드가 2~3단계로 깊어지더라도 **본문 문장은 무조건 기본 텍스트 `16px`를 유지**한다 (폰트 축소 금지).
2. **컨테이너 대비로 계층 표현**: 폰트를 줄이는 대신 **상위 카드(흰색 bg-white + 18px 제목) ➔ 하위 카드(연회색 bg-light/테마배경 + 16px 제목)**의 대비로 표현한다.
3. **인라인 하이라이트 폰트 보존**: 문장 내 단어 강조 시 글자가 작아지는 `.badge` 대신 **주변 글자와 100% 동일한 16px 크기를 유지하는 하이라이트(`<span class="px-2 py-0.5 rounded bg-warning text-dark fw-bold">`)**를 사용한다.

* **단일 아이콘 원칙**: 소제목이나 헤더에는 FontAwesome 아이콘 **단 1개**만 적용하고 날 이모지와 중복 사용을 금지한다.

---

## 📐 3. SVG 다이어그램 1:1 제로 스케일 규격 (SVG Standards)

부모 HTML 컨테이너 너비에 맞춰 `viewBox` 가로값을 1:1로 설정합니다:

| 부모 레이아웃 | 실측 너비 | SVG viewBox 설정 |
| :--- | :--- | :--- |
| **2칼럼 우측 (`col-md-7`)** | **710px** | `viewBox="0 0 710 [높이]"` |
| **1칼럼 카드 (`col-lg-12`)** | **780px** | `viewBox="0 0 780 [높이]"` |
| **최상위 컨테이너 (`container-custom`)** | **1240px** | `viewBox="0 0 1240 [높이]"` |

* **원형 노드 크기**: 2~3글자 수식 입력 시 반지름 **최소 `r=28` (지름 56px)** 확보.
* **노드 텍스트 정렬**: `text-anchor="middle" dominant-baseline="central"` 속성 필수 선언.

---

## 🛠️ 도구 및 표준 자산 활용

1. **마스터 표준 스타일시트**: [css/standards.css](/css/standards.css)
   - 5단계 타이포그래피, 중첩 카드(`.card-parent`, `.card-nested`), 인라인 하이라이트(`.kw-highlight`), 목차 드로어 통합.
2. **마스터 표준 공통 스크립트**: [js/standards.js](/js/standards.js)
   - Highlight.js 자동 구동, `copyCode(this, 'id')` 원클릭 클립보드 복사, Iframe 실시간 반응형 높이 동기화(`sendHeight()`) 통합.
3. **표준 용어 사전**: [resources/glossary.json](./resources/glossary.json)
4. **공식 SVG 1:1 컴포넌트 템플릿**: [resources/svg_templates.html](./resources/svg_templates.html)

