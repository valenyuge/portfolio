import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
  canvaUrl?: string;
  figmaUrl?: string;
  bitacoraUrl?: string;
}

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
    <div className="mt-16 space-y-6 w-full">
      <h3 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-4 tracking-tight">
        {titulo}
      </h3>
      <div className="relative w-full aspect-video overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 shadow-2xl">
        <iframe
          loading="lazy"
          src={url}
          title={titulo}
          className="absolute top-0 left-0 w-full h-full border-none"
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

  useEffect(() => {
    if (p) { document.title = `${p.titulo} | Valentin Yuge`; }
    return () => { document.title = "Valentin Yuge | Portfolio"; };
  }, [p]);

  if (!p) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-bold">404</div>;

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-white font-sans relative">
      <SelectorIdioma />
      <div className="max-w-6xl mx-auto">
        {/* BOTÓN VOLVER */}
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-12 inline-block font-bold">
          {t('volver')}
        </Link>
        
        {/* CABECERA DEL PROYECTO */}
        <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full border border-blue-400/30">
                {p.categoria}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-6">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h1>
        </div>

        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
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
              {/* Prioridad 1: Bitácora */}
              {p.bitacoraUrl ? (
                <a href={p.bitacoraUrl} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  {i18n.language.startsWith('es') ? 'LEER BITÁCORA / PROCESO ↗' : 'READ CASE STUDY / LOG ↗'}
                </a>
              ) : p.urlExterna && p.urlExterna.trim() !== "" ? ( 
                /* Prioridad 2: URL */
                <a href={p.urlExterna} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  {t('ver_demo')}
                </a>
              ) : (
                /* Prioridad 3: Si no hay ninguna de las dos */
                <div className="text-slate-500 text-sm font-bold italic">
                  {i18n.language.startsWith('es') ? "* Proyecto de hardware/offline - Documentación en video" : "* Hardware/Offline project - Video documentation only"}
                </div>
              )}
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

        <VisualizadorDocumento 
            url={p.figmaUrl || p.canvaUrl} 
            titulo={p.figmaUrl ? "Memoria Técnica y Proceso de Diseño" : "Memoria Técnica y Proceso de Diseño"} 
        />
        
      </div> 
    </div> 
  );
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
            <h2 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">{i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">{i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}</p>
            <div className="text-blue-500 text-xs font-black tracking-widest">{t('detalle_mas')}</div>
          </Link>
        ))}
      </main>

      <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-slate-800 pt-16">
        <h2 className="text-3xl font-black mb-4">{t('contacto_tit')}</h2>
        <p className="text-slate-400 mb-8">{t('contacto_desc')}</p>
        <div className="flex justify-center flex-wrap gap-6">
          <a href="mailto:valentinyuge@gmail.com" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>📧</span><span className="font-bold">Email</span></a>
          <a href="https://linkedin.com/in/valentinyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🔗</span><span className="font-bold">LinkedIn</span></a>
          <a href="https://github.com/valenyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🐙</span><span className="font-bold">GitHub</span></a>
        </div>
      </footer>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL APP ---

function App() {
  const proyectos: Proyecto[] = [
    {
      id: "todo-list",
      titulo: "Full Stack To-Do List",
      titulo_en: "Full Stack To-Do List",
      fechaInicio: "2026-01",
      fechaFin: "2026-01",
      descripcion: "Aplicación de gestión de tareas Full Stack con persistencia en base de datos relacional.",
      descripcion_en: "Full Stack task management app with relational database persistence.",
      contenidoLargo: "Desarrollo con Node.js, Express y PostgreSQL gestionado con Prisma ORM. Incluye persistencia real y tipado fuerte con TypeScript.",
      contenidoLargo_en: "Development using Node.js, Express, and PostgreSQL managed with Prisma ORM. Includes real persistence and strong typing with TypeScript.",
      tecnologias: ["Node.js", "Express", "PostgreSQL", "Prisma", "React", "TypeScript", "Tailwind"],
      categoria: 'Web',
      urlExterna: "https://todolist-18e7.onrender.com/",
      videoUrl: "/proyectos/to-do.mp4"
    },
    {
      id: "runner-vr",
      titulo: "Hora Pico: VR Mobile",
      titulo_en: "Rush Hour: Mobile VR",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Videojuego inmersivo de realidad virtual que captura el caos urbano de intentar tomar el último colectivo.",
      descripcion_en: "Immersive VR game capturing the urban chaos of trying to catch the last bus.",
      contenidoLargo: "Desarrollo de 'Hora Pico', un Endless Runner en 3D para VR móvil. Implementé colisiones, audio espacial de proximidad y banda sonora generada con Suno AI.",
      contenidoLargo_en: "Development of 'Rush Hour', a 3D Endless Runner for mobile VR. I implemented collisions, spatial audio, and an AI-generated soundtrack.",
      tecnologias: ["Unity 3D", "C#", "Mobile VR", "OSC", "Suno AI"],
      bitacoraUrl: "https://cherry-halloumi-3aa.notion.site/Hora-pico-Bit-cora-2a387ae1d566802fa823f963f5a055de?pvs=14",
      categoria: 'Videojuegos',
      urlExterna: "",
      videoUrl: "/proyectos/VR.mp4"
    },
    {
      id: "win98",
      titulo: "OS Interactivo: Historia de la IA",
      titulo_en: "Interactive OS: History of AI",
      fechaInicio: "2025-09",
      fechaFin: "2025-09",
      descripcion: "Sistema operativo simulado en la web que funciona como una infografía interactiva sobre la evolución de la IA.",
      descripcion_en: "Simulated web operating system acting as an interactive infographic on the evolution of AI.",
      contenidoLargo: "Recreación funcional de la interfaz de Windows 98. Implementé aplicaciones simuladas (Explorer, Paint, Notepad) mediante JavaScript puro para narrar la historia de la IA. El proyecto destaca por su lógica de ventanas arrastrables y navegación temática basada en el software clásico de los 90.",
      contenidoLargo_en: "Functional recreation of the Windows 98 interface. I implemented simulated applications (Explorer, Paint, Notepad) using Vanilla JavaScript to narrate the history of AI. The project stands out for its draggable window logic and thematic navigation based on classic 90s software.",
      tecnologias: ["JavaScript", "HTML", "CSS", "UX/UI Design"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/infografia-taller/inicio.html",
      videoUrl: "/proyectos/Infografia-Windows.mp4",
      figmaUrl: "https://embed.figma.com/slides/0MrmBkCXCZ4qg5SctYO4mA/TP3-Memoria-Descriptiva?node-id=1-29&embed-host=share"
    },
    {
      id: "influencers-ia",
      titulo: "InfluencIA: Instalación Física",
      titulo_en: "InfluencIA: Physical Installation",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Instalación multimedia con Arduino y Unity que explora el fenómeno de las influencers IA mediante hardware personalizado.",
      descripcion_en: "Multimedia installation with Arduino and Unity exploring the AI influencer phenomenon.",
      contenidoLargo: "Navegación no lineal mediante códigos QR y potenciómetro físico (Arduino). Incluye trivia gamificada y comparativas gráficas.",
      contenidoLargo_en: "Non-linear navigation using QR codes and a physical potentiometer. Includes gamified trivia and graphical comparisons.",
      tecnologias: ["Unity", "Arduino", "C#", "OSC", "Physical Interaction"],
      categoria: 'Multimedia',
      urlExterna: "",
      videoUrl: "/proyectos/influencia.mp4",
      figmaUrl: "https://embed.figma.com/slides/LDxUXS9EZQ4gYKyfLzNSpl/Memoria-InfluencIA?node-id=1-735&embed-host=share"
    },
    {
      id: "redisenio-gato",
      titulo: "Rediseño 'El Gato y la Caja'",
      titulo_en: "'El Gato y la Caja' Redesign",
      fechaInicio: "2025-06",
      fechaFin: "2025-08",
      descripcion: "Rediseño de plataforma informativa mediante metodologías de Design Thinking y UX Research.",
      descripcion_en: "Digital news platform redesign using Design Thinking and UX Research methodologies.",
      contenidoLargo: "Proyecto de rediseño integral desarrollado bajo la metodología de Diseño Centrado en el Usuario (DCU). El proceso incluyó Benchmarking, Arquitectura de la Información mediante Card Sorting y el desarrollo de un sistema de componentes interactivos.",
      contenidoLargo_en: "Comprehensive redesign project developed under User-Centered Design (UCD) methodology. The process involved Benchmarking, Information Architecture through Card Sorting, and interactive component development.",
      tecnologias: ["JavaScript", "UX/UI Design", "Information Architecture", "HTML", "CSS", "Figma"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/UI-UXRedesignforSciencePlatform/index.html",
      videoUrl: "/proyectos/elgatoylacaja.mp4",
      figmaUrl: "https://embed.figma.com/deck/It7Ypl2xf2cKbyq1BfZBJm/Memoria-EGYLC?node-id=1-48&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
    },
    {
      id: "audio-reactiva",
      titulo: "Voice Brush: Arte Generativo",
      titulo_en: "Voice Brush: Generative Art",
      fechaInicio: "2025-04",
      fechaFin: "2025-08",
      descripcion: "Experiencia de arte generativo controlada por voz que deforma grillas algorítmicas en tiempo real.",
      descripcion_en: "Voice-controlled generative art experience that deforms algorithmic grids in real-time.",
      contenidoLargo: "Interpretación interactiva de la obra de Vera Molnar. Utiliza Web Audio API para procesar frecuencias sonoras en dibujos sobre Canvas.",
      contenidoLargo_en: "Interactive interpretation of Vera Molnar's work using Web Audio API to process sound into Canvas drawings.",
      tecnologias: ["Web Audio API", "Canvas", "JavaScript", "Generative Art"],
      categoria: 'Multimedia',
      urlExterna: "https://valenyuge.github.io/WebAudio-ReactiveExperience/index.html",
      videoUrl: "/proyectos/obra-sonido.mp4"
    },
    {
      id: "endless-runner-js",
      titulo: "Vanilla JS Runner & Web",
      titulo_en: "Vanilla JS Runner & Web",
      fechaInicio: "2024-09",
      fechaFin: "2024-11",
      descripcion: "Motor de juego 2D desarrollado desde cero en JS puro y plataforma web desplegada en Neocities.",
      descripcion_en: "2D game engine developed from scratch in Vanilla JS and web platform deployed on Neocities.",
      contenidoLargo: "Implementación manual de Game Loop y colisiones. Incluye landing page narrativa y despliegue funcional.",
      contenidoLargo_en: "Manual implementation of Game Loop and collisions. Includes narrative landing page and functional deployment.",
      tecnologias: ["JavaScript", "HTML", "CSS", "Game Logic", "Neocities"],
      categoria: 'Videojuegos',
      urlExterna: "https://valenyuge.neocities.org/",
      videoUrl: "/proyectos/runner-html.mp4"
    },
    {
      id: "arcade-versus",
      titulo: "Arcade: Amargados 1v1",
      titulo_en: "Amargados Arcade 1v1",
      fechaInicio: "2024-09",
      fechaFin: "2024-12",
      descripcion: "Instalación interactiva con controladores físicos hackeados y lógica de ritmo en Unity.",
      descripcion_en: "Interactive installation with hacked physical controllers and rhythm logic in Unity.",
      contenidoLargo: "Arcade 2D con hardware personalizado mediante matriz de teclado mapeada. Game Manager para estados y sistema de timing.",
      contenidoLargo_en: "2D arcade with custom hardware via mapped keyboard matrix. Game Manager for states and timing system.",
      tecnologias: ["Unity", "C#", "Hardware Hacking", "Game Design"],
      categoria: 'Videojuegos',
      urlExterna: "",
      videoUrl: "/proyectos/amargados.mp4"
    },
    {
      id: "landing-vorterix",
      titulo: "Landing Page 'Vorterix'",
      titulo_en: "'Vorterix' Landing Page",
      fechaInicio: "2025-04",
      fechaFin: "2025-05",
      descripcion: "Maquetación Pixel Perfect con enfoque en conversión y fidelidad visual de marca.",
      descripcion_en: "Pixel Perfect layout focused on conversion and brand visual fidelity.",
      contenidoLargo: "Desarrollo basado en Figma. Foco en optimización de activos y fidelidad visual estricta.",
      contenidoLargo_en: "Figma-based development. Focus on asset optimization and strict visual fidelity.",
      tecnologias: ["Figma", "HTML", "CSS", "JavaScript", "UX/UI Design"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/vorterix/index.html",
      videoUrl: "/proyectos/vorterix.mp4",
      canvaUrl: "https://www.canva.com/design/DAGoab_G6qE/OuNi1EX8LkiOvj41jqFICQ/view?embed"
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