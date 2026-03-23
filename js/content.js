/* 
  AI Docs Common Concept Script
  Handles: Iframe height auto-resize & common UI logic
*/

function updateParentHeight() {
  const height = document.body.scrollHeight;
  window.parent.postMessage({ height: height }, "*");
}

window.addEventListener('load', function() {
  updateParentHeight();
  // Update height on window resize
  window.addEventListener('resize', updateParentHeight);
});

// Global switchTab helper for documents that use tabs
// Supports both index-based and element/panelId-based switching
function switchTab(idxOrBtn, panelId) {
  if (typeof idxOrBtn === 'number') {
    const idx = idxOrBtn;
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
    document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
  } else {
    const btn = idxOrBtn;
    const bar = btn.closest('.tab-bar') || btn.closest('.tab-nav');
    if (bar) {
      bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const container = bar.parentElement;
      container.querySelectorAll('.tab-panel, .section').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(panelId);
      if (target) target.classList.add('active');
    }
  }
  
  // Update height after tab switch
  setTimeout(updateParentHeight, 50); 
}

// Global copyCode helper
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block') || btn.closest('pre');
  if (!codeBlock) return;
  const pre = codeBlock.tagName === 'PRE' ? codeBlock : codeBlock.querySelector('pre');
  if (!pre) return;
  
  const text = pre.innerText || pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '복사됨!';
    btn.classList.add('copied');
    setTimeout(() => { 
      btn.textContent = originalText; 
      btn.classList.remove('copied');
    }, 1800);
  });
}
