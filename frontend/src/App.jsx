import { useState, useEffect } from 'react';
import { TRANSLATIONS, GALLERY_DATA } from './i18n';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CustomCursor from './components/CustomCursor';
import Lightbox from './components/Lightbox';
import HomeView from './views/HomeView';
import GalleryView from './views/GalleryView';
import CulpableView from './views/CulpableView';
import ContactView from './views/ContactView';
import './styles/tokens.css';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('es');
  const [view, setView] = useState('inicio');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const t = TRANSLATIONS[lang];
  const murales = GALLERY_DATA.murales;
  const cuadros = GALLERY_DATA.cuadros;
  const streetart = GALLERY_DATA.streetart;
  const featured = [
    { ...murales[1], mediumLabel: t.medMurales },
    { ...cuadros[0], mediumLabel: t.medCuadros },
    { ...streetart[3], mediumLabel: t.medStreet }
  ];

  return (
    <div data-theme={theme} style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Sidebar view={view} setView={setView} t={t} />
      <main style={{ flex: '1 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} t={t} />
        <div style={{ flex: 1, padding: '40px 44px', overflow: 'auto' }}>
          {view === 'inicio' && (
            <HomeView t={t} featured={featured} onOpen={setLightboxItem} goMurales={() => setView('murales')} />
          )}
          {view === 'murales' && (
            <GalleryView title={t.navMurales} tag={{ kicker: t.heroKicker, desc: t.muralesDesc }} items={murales} mediumLabel={t.medMurales} onOpen={setLightboxItem} />
          )}
          {view === 'cuadros' && (
            <GalleryView title={t.navCuadros} tag={{ kicker: t.heroKicker, desc: t.cuadrosDesc }} items={cuadros} mediumLabel={t.medCuadros} onOpen={setLightboxItem} />
          )}
          {view === 'street' && (
            <GalleryView title={t.navStreet} tag={{ kicker: t.heroKicker, desc: t.streetDesc }} items={streetart} mediumLabel={t.medStreet} onOpen={setLightboxItem} />
          )}
          {view === 'culpable' && <CulpableView t={t} />}
          {view === 'contacto' && <ContactView t={t} />}
        </div>
      </main>
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      <CustomCursor />
    </div>
  );
}