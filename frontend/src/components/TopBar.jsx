import { useState } from 'react';
import { LANGS, TRANSLATIONS } from '../i18n';

const LANG_NAMES = { es: 'Castellano', ca: 'Català', fr: 'Français', en: 'English' };

export default function TopBar({ theme, setTheme, lang, setLang, t }) {
  const [langOpen, setLangOpen] = useState(false);
  const dark = theme === 'dark';

  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14,
      padding: '20px 28px', borderBottom: '1px solid var(--color-divider)'
    }}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setLangOpen((o) => !o)}
          aria-label={t.langLabel}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'transparent',
            border: '1px solid var(--color-divider)', borderRadius: 8, padding: '6px 12px',
            fontSize: 13, color: 'var(--color-text)', cursor: 'pointer'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9s1.3-6.5 3.8-9Z" />
          </svg>
          <span>{TRANSLATIONS[lang].code}</span>
        </button>
        {langOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 140,
            background: 'var(--color-surface)', border: '1px solid var(--color-divider)',
            borderRadius: 8, boxShadow: 'var(--shadow-md)', padding: 4, display: 'flex',
            flexDirection: 'column', gap: 2, zIndex: 20
          }}>
            {LANGS.map((code) => (
              <button
                key={code}
                onClick={() => { setLang(code); setLangOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', border: 'none', borderRadius: 6,
                  padding: '8px 10px', fontSize: 13, cursor: 'pointer',
                  background: lang === code ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'transparent',
                  color: lang === code ? 'var(--color-accent)' : 'var(--color-text)'
                }}
              >
                {TRANSLATIONS[code].code} — {LANG_NAMES[code]}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setTheme(dark ? 'light' : 'dark')}
        aria-label={t.themeAria}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'transparent',
          border: '1px solid var(--color-divider)', borderRadius: 20, padding: 4, cursor: 'pointer'
        }}
      >
        <div style={{
          width: 40, height: 22, borderRadius: 11,
          background: dark ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'color-mix(in srgb, var(--color-accent) 18%, transparent)',
          position: 'relative', transition: 'background .2s'
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: '50%', background: 'var(--color-accent)',
            position: 'absolute', top: 3, left: dark ? 21 : 3, transition: 'left .2s'
          }} />
        </div>
      </button>
    </div>
  );
}
