import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Dev-only: log any full-screen fixed/absolute elements to help debug overlay issues
if (import.meta.env.DEV) {
  window.__logFullScreenEls = () => {
    const els = Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const s = getComputedStyle(el);
        if (!s) return false;
        const pos = s.position;
        const inset0 = (s.top === '0px' && s.right === '0px' && s.bottom === '0px' && s.left === '0px');
        const fullSize = (el.clientWidth === window.innerWidth && el.clientHeight === window.innerHeight);
        return (pos === 'fixed' || pos === 'absolute') && (inset0 || fullSize);
      });
    console.group('Full-screen fixed/absolute elements');
    els.forEach(el => {
      const s = getComputedStyle(el);
      console.log(el, { tag: el.tagName, id: el.id, class: el.className, zIndex: s.zIndex, background: s.backgroundColor || s.background, pointerEvents: s.pointerEvents });
    });
    console.groupEnd();
    return els;
  };
  console.log('Dev helper: call `__logFullScreenEls()` in the console to list full-screen elements.');
}

