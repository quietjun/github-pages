/**
 * 📘 github-pages Master Standard Script (standards.js)
 * ----------------------------------------------------
 * 1. Highlight.js 자동 구동
 * 2. 원클릭 코드 복사 유틸리티 (FontAwesome 아이콘 피드백 지원)
 * 3. Iframe 반응형 높이 실시간 자동 동기화 (frameHeight / height 듀얼 호환)
 */

(function () {
    'use strict';

    // 1. Highlight.js 자동 초기화
    function initHighlight() {
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }

    // 2. 글로벌 원클릭 코드 복사 유틸리티
    window.copyCode = function (btn, targetId) {
        let text = '';

        if (targetId) {
            const codeEl = document.getElementById(targetId);
            if (codeEl) {
                text = codeEl.innerText || codeEl.textContent;
            }
        }

        if (!text) {
            const parent = btn.closest('.card-parent, .code-block, .p-3, pre') || btn.parentElement;
            if (parent) {
                const pre = parent.querySelector('pre') || parent.querySelector('code');
                if (pre) {
                    text = pre.innerText || pre.textContent;
                }
            }
        }

        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check text-success me-1"></i>복사됨!';
            btn.classList.add('border-success', 'text-success');

            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.classList.remove('border-success', 'text-success');
            }, 2000);
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };

    // 3. Iframe 실시간 반응형 높이 동기화
    window.sendHeight = function () {
        const height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.offsetHeight,
            document.body.offsetHeight
        );
        window.parent.postMessage({ frameHeight: height, height: height }, '*');
    };

    // DOM 준비 시 자동 초기화 바인딩
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    function initAll() {
        initHighlight();
        window.sendHeight();

        window.addEventListener('load', window.sendHeight);
        window.addEventListener('resize', window.sendHeight);

        // DOM 변경 감지 (동적 패널 전환 등)
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(() => {
                window.sendHeight();
            });
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        }
    }
})();
