---
name: create-page
description: >-
  github-pages 프로젝트에서 강의 자료 및 기술 블로그용 HTML 페이지를 작성할 때 사용하는 전용 스킬입니다.
  3대 절대 금지 규칙, 5단계 시각화 우선순위, 마스터 템플릿 준수 지침을 정밀히 정의합니다.
---

# 📝 HTML 페이지 작성 지침 (Create Page Master Guide)

본 지침은 github-pages 프로젝트 내 기술 문서 및 강의용 HTML 작성 시 준수해야 할 필수 규칙을 정의합니다.

---

## 🚨 3대 절대 금지 규칙 (Must NEVER Do)

1. **전역 폰트 강제 주입 금지 (`font-size: max(...) !important` 금지)**
   - `body, p, span, div... { font-size: max(14px, 1em) !important; }`와 같은 전역 CSS 주입을 **절대 금지**한다.
   - 버튼(13px), 배지, 코드 블록(17px), 제목 등 페이지 전체 타이포그래피 계층을 파괴하므로, [resources/template.html](./resources/template.html) 마스터 템플릿 고유의 폰트 계층을 그대로 보존한다.

2. **SVG 1:1 무축소/무확대 원칙 (Zero Scale-Down/Up)**
   - SVG `viewBox` 가로 폭은 부모 HTML 컨테이너(Bootstrap col) 물리적 너비와 **1:1로 100% 일치**해야 한다 (예: 컨테이너 710px ➔ `viewBox="0 0 710 ..."`).
   - 세부 SVG 레이아웃 및 1:1 스케일링 규격은 **[svg-standards 스킬](../svg-standards/SKILL.md)** 지침을 엄격히 적용한다.

3. **SVG `<text>` 내부 HTML 태그 사용 금지**
   - SVG `<text>` 안에 `<sub>`, `<sup>`, `<div>` 태그를 넣지 않는다 (렌더링 파괴 방지). 수식/인덱스는 Unicode 특수문자(`x₁`, `h₁`, `W_hh`)를 직접 작성한다.

---

## 🎨 디자인 및 시각적 구조화 규칙

1. **시각화 5단계 우선순위**: 인터랙티브 시뮬레이션 > SVG 다이어그램 > HTML 비교 표 > 목록 > 일반 텍스트.
2. **단일 아이콘 룰**: 헤더 및 제목에 FontAwesome 아이콘 1개만 표기 (이모지 중복 금지).
3. **이중 중첩 카드 금지**: 2중/3중 테두리 상자를 금지하고, 단일 카드(`border rounded-3 bg-white`) 내부에 `row g-3` 및 `bg-light` 블록 배치.
4. **LaTeX 사용 금지**: KaTeX/MathJax 및 `$...$` 절대 금지 ➔ HTML 태그(`<sub>`, `<sup>`, `<code>`) 활용.
5. **마스터 템플릿 준수**: [resources/template.html](./resources/template.html) 구조, `:root` 변수, TOC Drawer, Fira Code 17px(`text-align: left !important`), iframe 자동 높이 조절 스크립트 100% 반영.
6. **강의용 경어체 톤앤매너**: 문체 및 어조는 **[tone-standards 스킬](../tone-standards/SKILL.md)** 지침을 100% 적용하여 하십시오체/해요체 경어체(`~합니다`, `~입니다`)로 작성한다.