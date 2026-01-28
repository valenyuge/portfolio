import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// --- CONFIGURACIÓN DE IDIOMAS CON DETECCIÓN AUTOMÁTICA --- 
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
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'], 
    },
    interpolation: { escapeValue: false }
  });

interface Proyecto {
  id: string;
  titulo: string;
  titulo_en?: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  descripcion_en?: string;
  contenidoLargo: string;
  contenidoLargo_en?: string;
  tecnologias: string[];
  categoria: 'Web' | 'Videojuegos' | 'Multimedia';
  urlExterna: string;
  videoUrl?: string;
}

// --- COMPONENTE SELECTOR DE IDIOMA ---
const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    /* Cambiamos 'fixed' por 'absolute' */
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-full border border-slate-700 shadow-xl scale-90 md:scale-100">
      <button 
        onClick={() => i18n.changeLanguage('es')}
        className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('es') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >ES</button>
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >EN</button>
    </div>
  );
};

// --- VISTA DE DETALLES ---
const DetalleProyecto = ({ lista }: { lista: Proyecto[] }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const p = lista.find(proj => proj.id === id);

  useEffect(() => {
    if (p) { document.title = `${p.titulo}`; }
    return () => { document.title = "Portfolio"; };
  }, [p]);

  if (!p) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-bold">404</div>;

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-white font-sans relative">
      <SelectorIdioma />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
                <a href={p.urlExterna} target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  {t('ver_demo')}
                </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/50 shadow-2xl w-full">
              {p.videoUrl ? (
                esVideoYoutube ? (
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src={p.videoUrl.replace("watch?v=", "embed/")} title={p.titulo} allowFullScreen></iframe>
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
      </div>
    </div>
  );
};

// --- VISTA PRINCIPAL ---
const GrillaProyectos = ({ proyectos }: { proyectos: Proyecto[] }) => {
  const { t, i18n } = useTranslation();
  const [filtro, setFiltro] = useState('Todos');

  const proyectosOrdenados = [...proyectos].sort((a, b) => 
    new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime()
  );

  const formatearPeriodo = (inicio: string, fin: string) => {
    const limpiar = (f: string) => f.split('-').reverse().join('/');
    return inicio === fin ? limpiar(inicio) : `${limpiar(inicio)} — ${limpiar(fin)}`;
  };

  const filtrados = filtro === 'Todos' ? proyectosOrdenados : proyectosOrdenados.filter(p => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-white font-sans relative">
      <SelectorIdioma />
        <header className="max-w-5xl mx-auto text-center mb-16 pt-12 md:pt-0"> 
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Valentin Yuge
          </h1>
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
              <button 
                key={cat} 
                onClick={() => setFiltro(cat)} 
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                  filtro === cat 
                    ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20 scale-105 text-white' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {traducciones[cat]}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((p) => (
            <Link 
              key={p.id} 
              to={`/proyecto/${p.id}`} 
              className="group block bg-slate-800 p-8 rounded-4xl border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 shadow-xl"
            >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 block">{p.categoria}</span>
              <span className="text-slate-500 text-[11px] font-bold">{formatearPeriodo(p.fechaInicio, p.fechaFin)}</span>
            </div>
            <h2 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">
                {i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}
            </p>
            <div className="text-blue-500 text-xs font-black tracking-widest">{t('detalle_mas')}</div>
          </Link>
        ))}
      </main>

      <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-slate-800 pt-16">
        <h2 className="text-3xl font-black mb-4">{t('contacto_tit')}</h2>
        <p className="text-slate-400 mb-8">{t('contacto_desc')}</p>
        <div className="flex justify-center flex-wrap gap-6">
          <a href="mailto:valentinyuge@gmail.com" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 px-6 py-3 rounded-2xl transition-all border border-slate-700">
            <span>📧</span><span className="font-bold">Email</span>
          </a>
          <a href="https://linkedin.com/in/valentinyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all border border-slate-700">
            <span>🔗</span><span className="font-bold">LinkedIn</span>
          </a>
          <a href="https://github.com/valenyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl transition-all border border-slate-700">
            <span>🐙</span><span className="font-bold">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const proyectos: Proyecto[] = [
    {
      id: "runner-vr",
      titulo: "Runner 3D VR Mobile",
      titulo_en: "Mobile 3D VR Runner",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Videojuego VR con sistema de inputs mediante webcam para detectar movimiento físico.",
      descripcion_en: "VR Game with a webcam input system to detect physical movement.",
      contenidoLargo: "Desarrollo de un videojuego de realidad virtual para móviles...",
      contenidoLargo_en: "Mobile VR game development...",
      tecnologias: ["Unity", "C#", "Motion Tracking"],
      categoria: 'Videojuegos',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/VR.mp4"
    },
    {
      id: "win98",
      titulo: "Infografía Interactiva 'Win98'",
      titulo_en: "'Win98' Interactive Infographic",
      fechaInicio: "2025-09",
      fechaFin: "2025-09",
      descripcion: "Interfaz que simula un sistema operativo con ventanas arrastrables y lógica compleja.",
      descripcion_en: "Interface simulating an operating system with draggable windows.",
      contenidoLargo: "Programación de gestión del DOM para ventanas (popups) arrastrables...",
      contenidoLargo_en: "DOM management for draggable windows...",
      tecnologias: ["JavaScript", "HTML", "CSS"],
      categoria: 'Web',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/Infografia-Windows.mp4"
    },
    {
      id: "audio-reactiva",
      titulo: "Experiencia Web Audio-Reactiva",
      titulo_en: "Audio-Reactive Web Experience",
      fechaInicio: "2025-04",
      fechaFin: "2025-08",
      descripcion: "Obra generativa controlada por voz que analiza frecuencias en tiempo real.",
      descripcion_en: "Voice-controlled generative piece analyzing frequencies.",
      contenidoLargo: "Creación de una obra generativa controlada por voz...",
      contenidoLargo_en: "Voice-controlled generative artwork...",
      tecnologias: ["Web Audio API", "Canvas", "JavaScript"],
      categoria: 'Multimedia',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/obra-sonido.mp4"
    },
    {
      id: "influencers-ia",
      titulo: "Instalación 'Influencers IA'",
      titulo_en: "'AI Influencers' Installation",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Lógica en Unity conectada a una instalación física con sensores Arduino.",
      descripcion_en: "Unity logic connected to a physical installation with Arduino sensors.",
      contenidoLargo: "Programación de la comunicación entre sensores físicos...",
      contenidoLargo_en: "Programming the communication between physical sensors...",
      tecnologias: ["Unity", "Arduino", "Serial Com"],
      categoria: 'Multimedia',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/influencia.mp4"
    },
    {
      id: "endless-runner-js",
      titulo: "Juego 'Endless Runner' Web",
      titulo_en: "Web 'Endless Runner' Game",
      fechaInicio: "2024-09",
      fechaFin: "2024-11",
      descripcion: "Motor de juego básico desarrollado desde cero con JavaScript puro.",
      descripcion_en: "Basic game engine developed from scratch with pure JavaScript.",
      contenidoLargo: "Implementación manual del Game Loop, detección de colisiones...",
      contenidoLargo_en: "Manual implementation of the Game Loop...",
      tecnologias: ["JavaScript", "Lógica de Juegos"],
      categoria: 'Videojuegos',
      urlExterna: "https://valenyuge.neocities.org/",
      videoUrl: "/proyectos/runner-html.mp4"
    },
    {
      id: "arcade-versus",
      titulo: "Arcade Sincro Versus 1v1",
      titulo_en: "1v1 Synchro Versus Arcade",
      fechaInicio: "2024-09",
      fechaFin: "2024-12",
      descripcion: "Game Manager central para control de estados y sistema de puntuación.",
      descripcion_en: "Central Game Manager for state control and scoring system.",
      contenidoLargo: "Gestión de temporizadores y sistema de puntuación...",
      contenidoLargo_en: "Timer management and scoring system...",
      tecnologias: ["Unity", "C#"],
      categoria: 'Videojuegos',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/amargados.mp4"
    },
    {
      id: "landing-vorterix",
      titulo: "Landing Page 'Vorterix'",
      titulo_en: "'Vorterix' Landing Page",
      fechaInicio: "2025-04",
      fechaFin: "2025-05",
      descripcion: "Maquetación Full Responsive Pixel Perfect para captura de datos.",
      descripcion_en: "Full Responsive Pixel Perfect layout for data capture.",
      contenidoLargo: "Enfoque Pixel Perfect respetando la identidad visual de la marca...",
      contenidoLargo_en: "Pixel Perfect approach respecting brand identity...",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      categoria: 'Web',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/vorterix.mp4"
    },
    {
      id: "redisenio-gato",
      titulo: "Rediseño 'El Gato y la Caja'",
      titulo_en: "'El Gato y la Caja' Redesign",
      fechaInicio: "2025-06",
      fechaFin: "2025-08",
      descripcion: "Refactorización de interfaz con componentes interactivos reutilizables.",
      descripcion_en: "Interface refactoring with reusable interactive components.",
      contenidoLargo: "Desarrollo de carruseles de imágenes y navegación...",
      contenidoLargo_en: "Image carousel development and breadcrumb navigation...",
      tecnologias: ["JavaScript", "UX", "HTML/CSS"],
      categoria: 'Web',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/elgatoylacaja.mp4"
    },
    {
      id: "todo-list",
      titulo: "To-Do List",
      titulo_en: "To-Do List",
      fechaInicio: "2026-01",
      fechaFin: "2026-01",
      descripcion: "App de gestión de tareas con TypeScript y React.",
      descripcion_en: "Task management app with TypeScript and React.",
      contenidoLargo: "Aplicación de gestión de tareas con persistencia de datos...",
      contenidoLargo_en: "Task management application with data persistence...",
      tecnologias: ["React", "TypeScript", "Tailwind"],
      categoria: 'Web',
      urlExterna: "https://todolist-18e7.onrender.com/",
      videoUrl: "/proyectos/to-do.mp4"
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GrillaProyectos proyectos={proyectos} />} />
        <Route path="/proyecto/:id" element={<DetalleProyecto lista={proyectos} />} />
      </Routes>
    </Router>
  );
}

export default App;