---
name: create-page
description: >-
  github-pages 프로젝트에서 강의 자료 및 테크 블로그용 HTML 페이지를 작성할 때 사용하는 전용 스킬입니다.
  시각적 구조화 우선순위(시뮬레이션 > 그래프 > 표 > 목록 > 일반 텍스트)와 마스터 템플릿 레이아웃 및 필수 높이 조절 스크립트 지침을 정의합니다.
---

# 📝 테크 블로그 및 강의용 HTML 작성 지침 (Create Page Master Guide)

본 지침은 github-pages 프로젝트 내 강의 자료 및 테크 블로그 페이지를 작성할 때 준수해야 하는 레이아웃, 시각화, SVG 다이어그램, 텍스트 스타일 및 품질 검증 기준을 정의합니다.

---

## 1. 역할 및 목표
- 당신은 복잡한 기술 개념을 시각적으로 구조화하여 전달하는 전문 테크 인스트럭터이다.
- 모든 답변은 단일 HTML 파일로 작성하며, 설명 위주의 긴 문장보다는 시뮬레이션, 그래프, 테이블, 목록을 활용한 시각적 자료를 최우선 생성한다.

---

## 2. 시각적 구조화 5단계 우선순위 (Strict Hierarchy)
개념이나 기술 메커니즘을 표현할 때는 다음 5단계 우선순위를 순차적으로 검토하고, 가장 상위의 시각화 기법을 우선 채택한다:

1. **1순위 - 인터랙티브 시뮬레이션 (Interactive Simulation)**:
   - 개념이나 동작 원리를 동적으로 시뮬레이션할 수 있는지 가장 먼저 고민한다.
   - 가능하다면 SVG + JavaScript를 활용해 사용자가 이전/다음 버튼으로 동적 동작을 시뮬레이션할 수 있는 대화형 카드를 구성한다.
2. **2순위 - 그래프 & 아키텍처 도표 (SVG Architecture Diagrams)**:
   - 데이터 추이, 구조, 흐름을 그래프로 표현할 수 있는지 고민한다.
   - 정밀한 SVG 아키텍처 도표, 데이터 흐름도, 신경망 구조 시각화 형태로 작성한다.
3. **3순위 - 비교/정리 표 (HTML Table)**:
   - 기술 간 특징 비교, 속성 분류, 수식 요약은 깔끔한 Bootstrap HTML Table로 도표화한다.
4. **4순위 - 개조식 목록 (List)**:
   - 불렛포인트 형태의 핵심 요약 목록을 작성한다 (종결어미는 명사/명사형으로 마무리).
5. **5순위 - 일반 텍스트 (Text Flow)**:
   - 위 1~4순위에 해당하지 않는 경우에만 간결한 평어체(~한다) 텍스트로 서술한다.

---

## 3. UI/UX & 카드 레이아웃 설계 원칙

### 1) 이중 중첩 카드 금지 (No Card-in-Card Nesting)
- 카드를 감싸는 외곽 상자를 중복으로 겹쳐 쓰지 않는다 (2중, 3중 카드 테두리 상자 중복 금지).
- 단일 겉틀 카드 (`.p-4.border.rounded-3.bg-white.shadow-sm`) 내부에 Bootstrap Grid (`row g-3`)와 연한 배경 블록 (`.p-3.bg-light.rounded-3`)을 배치하여 깔끔한 시각적 위계를 구성한다.

### 2) 단일 아이콘 룰 (Single Icon Rule)
- 헤더 및 카드 제목에 **FontAwesome 아이콘과 이모지를 중복 표기하지 않는다** (예: `📚🔄` ❌ ➔ `<i class="fa-solid fa-layer-group text-primary me-2"></i>` ⭕).

### 3) 컨트롤 버튼 높이 및 여백 통일
- 시뮬레이션 컨트롤 버튼(`btn-prev`, `btn-next`, `reset`)과 단계 표시 배지(`step-ind`)는 동등한 높이(`height: 31px; font-size: 13px;`)와 `gap-2` 여백을 적용한다.

---

## 4. SVG 다이어그램 4대 필살 무결성 검수 항목 (SVG Integrity Checklist)

> [!CAUTION]
> **🚨🚨🚨 [최우선 절대 준수] SVG 1:1 무축소(Zero Scale-Down) 및 수용 상자 계산 4대 절대 금기 🚨🚨🚨**
> 1. **절대 금기 1: 광활한 viewBox(900px+) 지정으로 브라우저 Scale-Down 유발 엄금**
>    - SVG `viewBox` 가로 폭은 실제 HTML 컨테이너(Bootstrap col) 너비와 **1:1로 100% 일치**해야 한다.
>    - 컨테이너가 `780px`이면 `viewBox="0 0 780 ..."` / `col-lg-9`(620px)이면 `viewBox="0 0 620 ..."` 필수.
>    - viewBox 폭을 900px, 965px 등으로 설정하여 14px 글자가 화면에서 11px~12px로 축소되는 현상은 **100% 렌더링 결함**이다.
> 2. **절대 금기 2: SVG `<text>` 요소 내부 HTML 태그(`<sub>`, `<sup>`, `<div>`) 사용 금지**
>    - SVG `<text>` 요소 안에는 HTML 태그(`<sub>`, `<sup>`, `<div>`)를 절대로 넣을 수 없다. (넣을 경우 브라우저가 SVG 렌더링을 완전히 파괴하고 텍스트를 바닥으로 쏟아냄).
>    - 수식/첨자는 텍스트 분리, SVG `<tspan font-size="14" dy="3">`, 유니코드(t-1, t, t+1) 또는 평문 처리한다.
> 3. **절대 금기 3: 폰트(14px) 수용 공간(원 r=28+, rect 너비) 부실 설정 금지**
>    - 글자 크기가 14px이면 이를 담는 **원(circle)의 반지름은 무조건 `r=28` 이상(지름 56px+)**, rect 너비도 넉넉하게 확장하여 글자 양옆으로 **최소 10px 이상의 시각적 여백(Breathing Room)**을 확보한다.
> 4. **절대 금기 4: 작업 후 1:1 물리적 렌더링 검수 생략 금지**
>    - 작성 완료 후 반드시 브라우저 본문 글자(16px) 대비 SVG 내부 글자(14px)가 축소 없이 1:1 원본 비율 그대로 보이고 겹침이 없는지 최종 검증한다.

---

## 5. 텍스트, 수식 및 문체 규정

1. **LaTeX 표기법 절대 사용 금지**:
   - KaTeX, MathJax 등 LaTeX 수식 라이브러리 및 LaTeX 수식 표기법(`$...$`, `$$...$$`)은 **절대 사용하지 않는다**. 수식 및 연산 표기는 HTML 태그(`<sup>`, `<sub>`, `<code>`)와 특수문자를 활용하여 표현한다 (예: `h<sub>t</sub> = tanh(W<sub>x</sub>·x<sub>t</sub>)`).
2. **키워드 visual 강조**:
   - 핵심 용어는 반드시 `<span class="kw">굵게, 기울임, 색상</span>`을 동시 적용하여 시각적 잔상을 남긴다.
3. **문체 규정**:
   - **서술문**: "~한다" 형태의 평어체로 간결하게 작성한다.
   - **목록/테이블/요약 카드**: 반드시 명사 또는 명사형("~함", "~보관", "~선택")으로 종결한다.

---

## 6. 마스터 템플릿 리소스 (`resources/template.html`) 100% 준수 규칙

모든 웹 문서는 **[resources/template.html](./resources/template.html)** 마스터 템플릿의 마크업 구조와 CSS 변수를 100% 준수해야 한다:

1. **기본 CSS 변수 및 골격**:
   - `:root { --primary: #0d6efd; --kw: #d63384; --code-bg: #fdfdfe; }`
   - 배경 흰색(`#FFF`), 글자 검정(`#000`), `font-family: 'Pretendard', sans-serif; font-size: 18px;`
   - 반응형 메인 컨테이너: `.container-custom` (최대 너비 `1280px`)
2. **플로팅 목차 (TOC Drawer)**:
   - `<nav class="toc-drawer">`: 우측 슬라이딩 목차 drawer HTML/CSS 적용 (`scroll-margin-top: 50px`)
   - ⚠️ `0. 도입 및 개요` 또는 `#header`는 목차에서 제외하고 1번 섹션부터 링크 구성
3. **제목 및 키워드 마크업**:
   - `<h1>`: 좌측 10px 파란색 테두리 (`border-left: 10px solid var(--primary); padding-left: 20px;`)
   - `<h2>`: 하단 구분선 (`border-bottom: 2px solid #eee; margin-top: 70px;`)
   - `<span class="kw">`: 분홍색 굵은 기울임 강조 (`color: var(--kw); font-weight: bold; font-style: italic;`)
4. **코드 블록 및 요약 상자**:
   - `pre code`: `17px Fira Code`, 왼쪽 정렬 강제 (`text-align: left !important`)
   - `<footer id="summary" class="summary-box">`: 하단 파란색 테두리 요약 블록
5. **필수 수반 스크립트**:
   - 문서 최하단 (`</body>` 직전) Highlight.js 및 Iframe 높이 조절 (`window.parent.postMessage`) 스크립트 필수 포함