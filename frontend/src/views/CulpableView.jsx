export default function CulpableView({ t }) {
  return (
    <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>{t.culpableTag}</div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <img
          src="/assets/culpable-portrait.jpg"
          alt={t.culpableName}
          style={{ width: 220, height: 260, objectFit: 'cover', borderRadius: 10, flex: 'none' }}
        />
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ fontSize: 34, marginBottom: 16 }}>{t.culpableName}</h2>
          <p className="textbox" style={{ fontSize: 15, lineHeight: 1.7 }}>{t.culpableBio}</p>
        </div>
      </div>
    </div>
  );
}
