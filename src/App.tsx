import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
// Importamos las herramientas de traducción
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

// --- CONFIGURACIÓN DE IDIOMAS ---
i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        subtitulo: "Estudiante de Diseño Multimedial @ UNLP | Desarrollador",
        volver: "← Volver a la grilla",
        sobre: "Sobre el proyecto",
        tech: "Tecnologías utilizadas",
        ver_demo: "VER REPOSITORIO / DEMO ↗",
        detalle_mas: "VER DETALLES +"
      }
    },
    en: {
      translation: {
        subtitulo: "Multimedia Design Student @ UNLP | Developer",
        volver: "← Back to grid",
        sobre: "About the project",
        tech: "Technologies used",
        ver_demo: "VIEW REPOSITORY / DEMO ↗",
        detalle_mas: "VIEW DETAILS +"
      }
    }
  },
  lng: "es", // Idioma inicial
  fallbackLng: "es",
  interpolation: { escapeValue: false }
});

interface Proyecto {
  id: string;
  titulo: string;
  titulo_en?: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  descripcion_en?: string; // Agregamos descripción en inglés
  contenidoLargo: string;
  contenidoLargo_en?: string; // Agregamos contenido largo en inglés
  tecnologias: string[];
  categoria: 'Web' | 'Videojuegos' | 'Multimedia';
  urlExterna: string;
  videoUrl?: string;
}

// --- COMPONENTE SELECTOR DE IDIOMA ---
const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    <div className="fixed top-6 right-8 z-50 flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-full border border-slate-700 shadow-xl">
      <button 
        onClick={() => i18n.changeLanguage('es')}
        className={`px-3 py-1 rounded-full text-xs font-black transition-all ${i18n.language === 'es' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >ES</button>
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-black transition-all ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
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
    <div className="min-h-screen bg-slate-900 text-white p-8 animate-in fade-in duration-500">
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
              {i18n.language === 'es' ? p.titulo : (p.titulo_en || p.titulo)}
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-blue-400">{t('sobre')}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
                {i18n.language === 'es' ? p.contenidoLargo : (p.contenidoLargo_en || p.contenidoLargo)}
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
    <div className="min-h-screen bg-slate-900 p-8 text-white font-sans">
      <SelectorIdioma />
      <header className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Valentin Yuge
        </h1>
        <p className="text-slate-400 text-lg">{t('subtitulo')}</p>
      </header>

      <nav className="flex justify-center flex-wrap gap-3 mb-16">
        {['Todos', 'Web', 'Videojuegos', 'Multimedia'].map(cat => {
          // Definimos la traducción aquí mismo
          const traducciones: any = {
            'Todos': i18n.language === 'es' ? 'Todos' : 'All',
            'Web': 'Web',
            'Videojuegos': i18n.language === 'es' ? 'Videojuegos' : 'Games',
            'Multimedia': i18n.language === 'es' ? 'Multimedia' : 'Multimedia'
          };

          return (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)} 
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  filtro === cat ? 'bg-blue-600 shadow-xl shadow-blue-600/30 scale-110' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              }`}
            >
              {traducciones[cat]}
            </button>
          );
        })}
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((p) => (
          <Link key={p.id} to={`/proyecto/${p.id}`} 
            className="group block bg-slate-800 p-8 rounded-[2rem] border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 block">{p.categoria}</span>
              <span className="text-slate-500 text-[11px] font-bold">{formatearPeriodo(p.fechaInicio, p.fechaFin)}</span>
            </div>
            <h2 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">
              {i18n.language === 'es' ? p.titulo : (p.titulo_en || p.titulo)}
            </h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">
                {i18n.language === 'es' ? p.descripcion : (p.descripcion_en || p.descripcion)}
            </p>
            <div className="text-blue-500 text-xs font-black tracking-widest">{t('detalle_mas')}</div>
          </Link>
        ))}
      </main>
    </div>
  );
};

// --- APP COMPONENT (con datos de ejemplo para inglés) ---
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
      contenidoLargo: "Desarrollo de un videojuego de realidad virtual para móviles. Implementación de un sistema de inputs no convencional mediante webcam externa para detectar el movimiento físico del usuario y trasladarlo al personaje en tiempo real.",
      contenidoLargo_en: "Mobile VR game development. Implementation of a non-conventional input system using an external webcam to detect the user's physical movement and translate it to the character in real-time.",
      tecnologias: ["Unity", "C#", "Motion Tracking", "OSC"],
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
      descripcion_en: "Interface simulating an operating system with draggable windows and complex logic.",
      contenidoLargo: "Programación de gestión del DOM para ventanas (popups) arrastrables, reloj en tiempo real, persistencia de datos de usuario y lógica de control para reproductores multimedia customizados.",
      contenidoLargo_en: "DOM management for draggable windows, real-time clock, user data persistence, and control logic for customized media players.",
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
      descripcion_en: "Voice-controlled generative piece analyzing frequencies in real-time.",
      contenidoLargo: "Creación de una obra generativa controlada por voz. Programación de algoritmos de análisis de frecuencia (tonos agudos/graves) para modificar variables visuales de dibujo y borrado en tiempo real.",
      contenidoLargo_en: "Voice-controlled generative artwork. Frequency analysis algorithms (treble/bass) to modify visual drawing and erasing variables in real-time.",
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
      contenidoLargo: "Programación de la comunicación entre sensores físicos (potenciómetro) y el software para la navegación, integrando lectura de códigos QR.",
      contenidoLargo_en: "Programming the communication between physical sensors (potentiometer) and the software for navigation, including QR code reading.",
      tecnologias: ["Unity", "Arduino", "Serial Com", "C#"],
      categoria: 'Multimedia',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/influencers.mp4"
    },
    {
      id: "endless-runner-js",
      titulo: "Juego 'Endless Runner' Web",
      titulo_en: "Web 'Endless Runner' Game",
      fechaInicio: "2024-09",
      fechaFin: "2024-11",
      descripcion: "Motor de juego básico desarrollado desde cero con JavaScript puro.",
      descripcion_en: "Basic game engine developed from scratch with pure JavaScript.",
      contenidoLargo: "Implementación manual del Game Loop, detección de colisiones (AABB), gravedad y generación procedural de obstáculos, demostrando comprensión de la lógica base de videojuegos.",
      contenidoLargo_en: "Manual implementation of the Game Loop, collision detection (AABB), gravity, and procedural obstacle generation.",
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
      contenidoLargo: "Gestión de temporizadores y sistema de puntuación. Sincronización de animaciones con eventos de lógica y control de interfaz de usuario (UI) para múltiples pantallas.",
      contenidoLargo_en: "Timer management and scoring system. Animation synchronization with logic events and UI control for multiple screens.",
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
      contenidoLargo: "Enfoque Pixel Perfect respetando la identidad visual de la marca. Programación de lógica para captura y almacenamiento de datos de usuario.",
      contenidoLargo_en: "Pixel Perfect approach respecting brand identity. Programming logic for user data capture and storage.",
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
      contenidoLargo: "Desarrollo de carruseles de imágenes y navegación por breadcrumbs. Optimización de la experiencia de usuario (UX) mediante scripts de interacción.",
      contenidoLargo_en: "Image carousel development and breadcrumb navigation. UX optimization through interaction scripts.",
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
      contenidoLargo: "Aplicación de gestión de tareas con persistencia de datos, tipado fuerte y diseño moderno. Implementación de estados complejos en React.",
      contenidoLargo_en: "Task management application with data persistence, strong typing, and modern design. Complex state implementation in React.",
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