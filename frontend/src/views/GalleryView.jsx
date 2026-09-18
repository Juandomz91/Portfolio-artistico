import MasonryGallery from '../components/MasonryGallery';

export default function GalleryView({ title, tag, items, mediumLabel, onOpen }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 8 }}>
        {tag.kicker}
      </div>
      <h2 style={{ fontSize: 34, marginBottom: 20 }}>{title}</h2>
      <p className="textbox" style={{ fontSize: 14, maxWidth: 520, marginBottom: 28 }}>{tag.desc}</p>
      <MasonryGallery items={items} mediumLabel={mediumLabel} onOpen={onOpen} />
    </div>
  );
}
