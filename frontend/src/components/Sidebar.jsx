const NAV_ICONS = {
  inicio: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" />,
  murales: <path d="M3.5 15 9 9.5l3.5 3.5L16 9l4.5 5" />,
  cuadros: <path d="M4 16l5-4.5 3 2.5 3-3 5 4.5" />,
  street: <path d="M9 21V10.5a3 3 0 0 1 6 0V21M7 21h10" />,
  culpable: <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />,
  contacto: <path d="M4 6.5 12 13l8-6.5" />
};

const ITEMS = [
  { key: 'inicio', labelKey: 'navInicio' },
  { key: 'murales', labelKey: 'navMurales' },
  { key: 'cuadros', labelKey: 'navCuadros' },
  { key: 'street', labelKey: 'navStreet' },
  { key: 'culpable', labelKey: 'navCulpable' },
  { key: 'contacto', labelKey: 'navContacto' }
];

export default function Sidebar({ view, setView, t }) {
  return (
    <aside style={{
      flex: '0 1 220px', minWidth: 200, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '28px 20px',
      borderRight: '1px solid var(--color-divider)', background: 'var(--color-surface)'
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 36 }}>
          Cnidari
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ITEMS.map((item) => {
            const active = view === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                  background: active ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'transparent',
                  color: active ? 'var(--color-accent)' : 'var(--color-text)',
                  border: 'none', borderRadius: 8, padding: '9px 12px', fontSize: 14, cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {NAV_ICONS[item.key]}
                </svg>
                <span>{t[item.labelKey]}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{t.footer}</div>
    </aside>
  );
}
