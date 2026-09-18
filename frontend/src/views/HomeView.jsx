export default function HomeView({ t, featured, onOpen, goMurales }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 14 }}>
        {t.heroKicker}
      </div>
      <h1 style={{ fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>{t.heroTitle}</h1>
      <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 8 }}>{t.heroSubtitle}</p>
      <p className="textbox" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 520, marginBottom: 32 }}>{t.heroBody}</p>
      <button
        onClick={goMurales}
        style={{
          color: 'var(--color-accent)', border: '1px solid var(--color-accent)', background: 'transparent',
          borderRadius: 8, padding: '11px 20px', fontSize: 14, cursor: 'pointer'
        }}
      >
        {t.heroCta}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 56 }}>
        {featured.map((item) => (
          <div key={item.id} onClick={() => onOpen(item)} style={{ cursor: 'pointer' }}>
            <img src={`/assets/${item.id}.jpg`} alt={item.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
            <div style={{ marginTop: 8, fontSize: 13, fontFamily: 'var(--font-heading)' }}>{item.title}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.year} — {item.mediumLabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
