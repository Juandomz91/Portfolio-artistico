export default function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', padding: 32,
        background: 'color-mix(in srgb, var(--color-bg) 70%, black)', zIndex: 100
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 820, width: '100%', background: 'var(--color-surface)', borderRadius: 14,
          boxShadow: 'var(--shadow-lg)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14
        }}
      >
        <img
          src={`/assets/${item.id}.jpg`}
          alt={item.title}
          style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: 10, display: 'block' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 19 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{item.year} — {item.mediumLabel}</div>
          </div>
          <button
            onClick={onClose}
            style={{ border: '1px solid var(--color-divider)', background: 'transparent', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: 'var(--color-text)' }}
          >✕</button>
        </div>
      </div>
    </div>
  );
}
