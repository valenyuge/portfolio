import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { proyectos, type Proyecto } from './proyectos';

// --- CONFIGURACIÓN DE IDIOMAS --- 
i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          subtitulo: "Estudiante de Diseño Multimedial @ UNLP | Desarrollador",
          volver: "← Volver a la grilla",
          sobre: "Sobre el proyecto",
          tech: "Tecnologías utilizadas",
          ver_demo: "VER REPOSITORIO / DEMO ↗",
          detalle_mas: "VER DETALLES +",
          contacto_tit: "Contacto",
          contacto_desc: "Estoy disponible para proyectos freelance y posiciones Junior."
        }
      },
      en: {
        translation: {
          subtitulo: "Multimedia Design Student @ UNLP | Developer",
          volver: "← Back to grid",
          sobre: "About the project",
          tech: "Technologies used",
          ver_demo: "VIEW REPOSITORY / DEMO ↗",
          detalle_mas: "VIEW DETAILS +",
          contacto_tit: "Contact me",
          contacto_desc: "Available for freelance projects and Junior positions."
        }
      }
    },
    fallbackLng: "es", 
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    interpolation: { escapeValue: false }
  });

// --- COMPONENTES AUXILIARES ---

const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-full border border-slate-700 shadow-xl scale-90 md:scale-100">
      <button onClick={() => i18n.changeLanguage('es')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('es') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>ES</button>
      <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
    </div>
  );
};

const VisualizadorDocumento = ({ url, titulo }: { url?: string, titulo: string }) => {
  if (!url) return null;

  return (
    /* Movimos el mt-16 aquí adentro */
    <div className="mt-16 space-y-6 w-full"> 
      <h3 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-4 tracking-tight">
        {titulo}
      </h3>
      <div className="relative w-full aspect-video overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 shadow-2xl">
        <iframe
          loading="lazy"
          src={url}
          title={titulo}
          className="absolute top-0 left-0 w-full h-full border-none touch-pan-y"
          allow="autoplay; fullscreen; vr"
          allowFullScreen
        />
      </div>
    </div>
  );
};

// --- VISTA DE DETALLES ---

const DetalleProyecto = ({ lista }: { lista: Proyecto[] }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const p = lista.find(proj => proj.id === id);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  useEffect(() => {
    if (p) { document.title = `${p.titulo} | Valentin Yuge`; }

    const verificarSiHayScroll = () => {
      const tieneContenidoAbajo = document.documentElement.scrollHeight > window.innerHeight + 50;
      if (tieneContenidoAbajo && window.scrollY < 50) {
        setMostrarScroll(true);
      } else {
        setMostrarScroll(false);
      }
    };

    verificarSiHayScroll();
    window.addEventListener('scroll', verificarSiHayScroll);
    window.addEventListener('resize', verificarSiHayScroll);

    return () => {
      document.title = "Valentin Yuge | Portfolio";
      window.removeEventListener('scroll', verificarSiHayScroll);
      window.removeEventListener('resize', verificarSiHayScroll);
    };
  }, [p]);

  if (!p) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-bold">404</div>;

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-white font-sans relative">
      <SelectorIdioma />
      
      {mostrarScroll && (
        <div 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 animate-bounce cursor-pointer hidden md:block"
        >
          <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-blue-500/20 hover:border-blue-400 transition-colors">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-12 inline-block font-bold">
          {t('volver')}
        </Link>
        
        <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full border border-blue-400/30">
                {p.categoria}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-6">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-blue-400">{t('sobre')}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
                {i18n.language.startsWith('es') ? p.contenidoLargo : (p.contenidoLargo_en || p.contenidoLargo)}
            </p>
            
            <div className="pt-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{t('tech')}</h3>
                <div className="flex flex-wrap gap-2">
                    {p.tecnologias.map(t => (
                        <span key={t} className="bg-slate-800 px-4 py-2 rounded-xl text-sm border border-slate-700">{t}</span>
                    ))}
                </div>
            </div>

            <div className="pt-8">
              {p.bitacoraUrl ? (
                <a href={p.bitacoraUrl} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  {i18n.language.startsWith('es') ? 'LEER BITÁCORA / PROCESO ↗' : 'READ CASE STUDY / LOG ↗'}
                </a>
              ) : p.urlExterna && p.urlExterna.trim() !== "" ? ( 
                <a href={p.urlExterna} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  {t('ver_demo')}
                </a>
              ) : (
                <div className="text-slate-500 text-sm font-bold italic">
                  {i18n.language.startsWith('es') ? "* Proyecto de hardware/offline - Documentación en video" : "* Hardware/Offline project - Video documentation only"}
                </div>
              )}
            </div>
          </div>

          <div className={`lg:col-span-7 ${p.id === 'influencers-ia' ? '' : 'lg:mt-14'}`}>
              <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/50 shadow-2xl w-full">
                {p.videoUrl ? (
                  esVideoYoutube ? (
                    <div className="aspect-video">
                      <iframe className="w-full h-full" src={p.videoUrl.replace("watch?v=", "embed/")} title={`Video de ${p.titulo}`} allowFullScreen></iframe>
                    </div>
                  ) : (
                    <video className="w-full h-auto max-h-[70vh] object-contain bg-black" controls muted loop>
                      <source src={p.videoUrl} type="video/mp4" />
                    </video>
                  )
                ) : (
                  <img src={`/proyectos/${p.id}.png`} alt={p.titulo} className="w-full h-auto object-cover" />
                )}
              </div>
          </div>
        </div> 

        <VisualizadorDocumento 
            url={p.figmaUrl || p.canvaUrl} 
            titulo={i18n.language.startsWith('es') ? "Memoria Técnica y Proceso de Diseño" : "Technical Report & Design Process"} 
        />

        <div className="border-slate-800">
          <SeccionContacto />
        </div>
        
      </div> 
    </div> 
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta (el pathname)

  return null; // No renderiza nada visual
};

// --- VISTA PRINCIPAL ---

const GrillaProyectos = ({ proyectos }: { proyectos: Proyecto[] }) => {
  const { t, i18n } = useTranslation();
  const [filtro, setFiltro] = useState('Todos');

  const proyectosOrdenados = [...proyectos].sort((a, b) => new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime());

  const formatearPeriodo = (inicio: string, fin: string) => {
    const limpiar = (f: string) => f.split('-').reverse().join('/');
    return inicio === fin ? limpiar(inicio) : `${limpiar(inicio)} — ${limpiar(fin)}`;
  };

  const filtrados = filtro === 'Todos' ? proyectosOrdenados : proyectosOrdenados.filter(p => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-white font-sans relative">
      <SelectorIdioma />
      <header className="max-w-5xl mx-auto text-center mb-16 pt-12 md:pt-0"> 
        <h1 className="text-4xl md:text-5xl font-black mb-4 py-2 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Valentin Yuge</h1>
        <p className="text-slate-400 text-base md:text-lg">{t('subtitulo')}</p>
      </header>

      <nav className="relative max-w-full overflow-hidden mb-12 md:mb-16">
        <div className="flex overflow-x-auto no-scrollbar pb-4 gap-3 px-4 md:justify-center">
          {['Todos', 'Web', 'Videojuegos', 'Multimedia'].map(cat => {
            const traducciones: Record<string, string> = {
              'Todos': i18n.language.startsWith('es') ? 'Todos' : 'All',
              'Web': 'Web',
              'Videojuegos': i18n.language.startsWith('es') ? 'Videojuegos' : 'Games',
              'Multimedia': i18n.language.startsWith('es') ? 'Multimedia' : 'Multimedia'
            };
            return (
              <button key={cat} onClick={() => setFiltro(cat)} className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${filtro === cat ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20 scale-105 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                {traducciones[cat]}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((p) => (
  <Link key={p.id} to={`/proyecto/${p.id}`} className="group block bg-slate-800 p-8 rounded-4xl border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 shadow-xl">
    
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 block">{p.categoria}</span>
      <span className="text-slate-500 text-[11px] font-bold">{formatearPeriodo(p.fechaInicio, p.fechaFin)}</span>
    </div>

    <h2 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">
      {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
    </h2>

    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">
      {i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}
    </p>

    {/* NUEVO: Etiquetas de Tecnologías en la Home */}
    <div className="flex flex-wrap gap-2 mb-8">
      {p.tecnologias.slice(0, 4).map(tech => (
        <span key={tech} className="text-[10px] font-bold bg-slate-900/50 text-slate-300 px-2 py-1 rounded-md border border-slate-700">
          {tech}
        </span>
      ))}
      {p.tecnologias.length > 4 && (
        <span className="text-[10px] font-bold text-slate-500 py-1">+ {p.tecnologias.length - 4}</span>
      )}
    </div>

    <div className="text-blue-500 text-xs font-black tracking-widest">{t('detalle_mas')}</div>
  </Link>
))}
      </main>
      <SeccionContacto />
    </div>
  );
};

const SeccionContacto = () => {
  const { t } = useTranslation();
  return (
    <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-slate-800 pt-16">
      <h2 className="text-3xl font-black mb-4">{t('contacto_tit')}</h2>
      <p className="text-slate-400 mb-8">{t('contacto_desc')}</p>
      <div className="flex justify-center flex-wrap gap-6">
        <a href="mailto:valentinyuge@gmail.com" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>📧</span><span className="font-bold">Email</span></a>
        <a href="https://linkedin.com/in/valentinyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🔗</span><span className="font-bold">LinkedIn</span></a>
        <a href="https://github.com/valenyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🐙</span><span className="font-bold">GitHub</span></a>
      </div>
    </footer>
  );
};



// --- COMPONENTE PRINCIPAL APP ---

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GrillaProyectos proyectos={proyectos} />} />
        <Route path="/proyecto/:id" element={<DetalleProyecto lista={proyectos} />} />
      </Routes>
      
    </Router>
  );
}

export default App;