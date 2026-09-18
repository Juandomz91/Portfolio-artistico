export default function MasonryGallery({ items, mediumLabel, onOpen }) {
  return (
    <div style={{ columnWidth: '280px', columnGap: 18 }}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onOpen({ ...item, mediumLabel })}
          style={{ breakInside: 'avoid', marginBottom: 18, cursor: 'pointer' }}
        >
          <img
            src={`/assets/${item.id}.jpg`}
            alt={item.title}
            style={{ width: '100%', height: item.h, objectFit: 'cover', borderRadius: 8, display: 'block' }}
          />
          <div style={{ marginTop: 8, fontSize: 13, fontFamily: 'var(--font-heading)' }}>{item.title}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.year} — {mediumLabel}</div>
        </div>
      ))}
    </div>
  );
}
