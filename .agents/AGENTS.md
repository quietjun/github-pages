# Antigravity 추가 행동 규칙

## GitHub Pages 프로젝트 HTML 생성 규칙
- `github-pages` 프로젝트에서 새롭게 HTML 파일을 생성하거나 수정할 때, 모든 HTML 파일의 `</body>` 태그 바로 직전에 반드시 아래의 iframe 높이 조절 스크립트를 추가해야 합니다.

```html
<script>
  function sendHeight() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ height: height }, "*");
  }
  window.onload = sendHeight;
  [50, 200, 500, 1000, 2000].forEach(function(delay) {
    setTimeout(sendHeight, delay);
  });
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(sendHeight);
    ro.observe(document.body);
  }
</script>
```
