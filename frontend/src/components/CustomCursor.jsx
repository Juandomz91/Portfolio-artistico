import { useEffect, useRef } from 'react';

/**
 * Cursor personalizado: anillo de 26px en --color-accent que sigue el puntero
 * y crece a 40px con relleno tenue sobre elementos interactivos.
 * Se desactiva automáticamente en dispositivos táctiles (ver tokens.css:
 * la regla `cursor:none` solo aplica bajo `@media (pointer:fine)`).
 */
export default function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    if (!isFinePointer) return;

    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 13}px)`;
      const hovering = e.target.closest('button,a,input,textarea,img,[role="button"]');
      el.style.width = hovering ? '40px' : '26px';
      el.style.height = hovering ? '40px' : '26px';
      el.style.background = hovering
        ? 'color-mix(in srgb, var(--color-accent) 25%, transparent)'
        : 'transparent';
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', top: 0, left: 0, width: 26, height: 26,
        border: '1.5px solid var(--color-accent)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference',
        transition: 'width .15s, height .15s, background .15s',
        transform: 'translate(-100px,-100px)'
      }}
    />
  );
}
