import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  contenidoLargo: string;
  tecnologias: string[];
  categoria: 'Web' | 'Videojuegos' | 'Multimedia';
  urlExterna: string;
  videoUrl?: string; // Opcional por si tenés video en YouTube/Vimeo
}

// --- VISTA DE DETALLES DEL PROYECTO ---
const DetalleProyecto = ({ lista }: { lista: Proyecto[] }) => {
  const { id } = useParams();
  const p = lista.find(proj => proj.id === id);

  useEffect(() => {
    if (p) {
      document.title = `${p.titulo}`;
    }
    // Opcional: Volver al título original cuando salís de la pestaña
    return () => { document.title = "Portfolio"; };
  }, [p]);

  if (!p) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-bold">Proyecto no encontrado</div>;

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-6xl mx-auto"> {/* Aumentamos un poco el ancho máximo */}
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors mb-12 inline-block font-bold">
          ← Volver a la grilla
        </Link>
        
        <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full border border-blue-400/30">
                {p.categoria}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-6">{p.titulo}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-blue-400">Sobre el proyecto</h3>
            <p className="text-slate-300 text-lg leading-relaxed">{p.contenidoLargo}</p>
            
            <div className="pt-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Tecnologías utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                {p.tecnologias.map(t => (
                    <span key={t} className="bg-slate-800 px-4 py-2 rounded-xl text-sm border border-slate-700">{t}</span>
                ))}
                </div>
            </div>

            <div className="pt-8">
                <a href={p.urlExterna} target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20 w-full text-center md:w-auto">
                  VER REPOSITORIO / DEMO ↗
                </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: MULTIMEDIA (Ajustada) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/50 shadow-2xl w-full">
              {p.videoUrl ? (
                esVideoYoutube ? (
                  <div className="aspect-video">
                    <iframe 
                      className="w-full h-full"
                      src={p.videoUrl.replace("watch?v=", "embed/")} 
                      title={p.titulo}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <video 
                    className="w-full h-auto max-h-[70vh] object-contain bg-black" 
                    controls 
                    muted 
                    loop
                  >
                    <source src={p.videoUrl} type="video/mp4" />
                  </video>
                )
              ) : (
                <img 
                  src={`/proyectos/${p.id}.png`} 
                  alt={p.titulo} 
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/1e293b/475569?text=Sin+Vista+Previa" }}
                />
              )}
            </div>

            {/* OPCIONAL: Espacio para más imágenes debajo del video si las tuvieras */}
            <div className="grid grid-cols-2 gap-4">
               {/* Aquí podrías mapear p.imagenes adicionales en el futuro */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISTA PRINCIPAL (GRILLA) ---
const GrillaProyectos = ({ proyectos }: { proyectos: Proyecto[] }) => {
  const [filtro, setFiltro] = useState('Todos');
  const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white font-sans">
      <header className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Valen Yuge
        </h1>
        <p className="text-slate-400 text-lg">Multimedia Design Student @ UNLP | Creative Developer</p>
      </header>

      <nav className="flex justify-center flex-wrap gap-3 mb-16">
        {['Todos', 'Web', 'Videojuegos', 'Multimedia'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setFiltro(cat)} 
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                filtro === cat ? 'bg-blue-600 shadow-xl shadow-blue-600/30 scale-110' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((p) => (
          <Link 
            key={p.id} 
            to={`/proyecto/${p.id}`} 
            className="group block bg-slate-800 p-8 rounded-[2rem] border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 shadow-xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 block">{p.categoria}</span>
            <h2 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">{p.titulo}</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">{p.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {p.tecnologias.slice(0, 3).map(t => (
                <span key={t} className="text-[10px] bg-slate-900/50 px-2 py-1 rounded text-slate-400 border border-slate-700">{t}</span>
              ))}
            </div>
            <div className="text-blue-500 text-xs font-black tracking-widest">VER DETALLES +</div>
          </Link>
        ))}
      </main>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  const proyectos: Proyecto[] = [
    {
      id: "runner-vr",
      titulo: "Runner 3D VR Mobile",
      descripcion: "Videojuego VR con sistema de inputs mediante webcam para detectar movimiento físico.",
      contenidoLargo: "Desarrollo de un videojuego de realidad virtual para móviles. Implementación de un sistema de inputs no convencional mediante webcam externa para detectar el movimiento físico del usuario y trasladarlo al personaje en tiempo real.",
      tecnologias: ["Unity", "C#", "Motion Tracking", "OSC"],
      categoria: 'Videojuegos',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/VR.mp4"
    },
    {
      id: "win98",
      titulo: "Infografía Interactiva 'Win98'",
      descripcion: "Interfaz que simula un sistema operativo con ventanas arrastrables y lógica compleja.",
      contenidoLargo: "Programación de gestión del DOM para ventanas (popups) arrastrables, reloj en tiempo real, persistencia de datos de usuario y lógica de control para reproductores multimedia customizados.",
      tecnologias: ["JavaScript", "HTML", "CSS"],
      categoria: 'Web',
      urlExterna: "https://github.com/valenyuge",
      videoUrl: "/proyectos/Infografia-Windows.mp4"
    },
    {
      id: "audio-reactiva",
      titulo: "Experiencia Web Audio-Reactiva",
      descripcion: "Obra generativa controlada por voz que analiza frecuencias en tiempo real.",
      contenidoLargo: "Creación de una obra generativa controlada por voz. Programación de algoritmos de análisis de frecuencia (tonos agudos/graves) para modificar variables visuales de dibujo y borrado en tiempo real.",
      tecnologias: ["Web Audio API", "Canvas", "JavaScript"],
      categoria: 'Multimedia',
      urlExterna: "https://github.com/valenyuge"
    },
    {
      id: "influencers-ia",
      titulo: "Instalación 'Influencers IA'",
      descripcion: "Lógica en Unity conectada a una instalación física con sensores Arduino.",
      contenidoLargo: "Programación de la comunicación entre sensores físicos (potenciómetro) y el software para la navegación, integrando lectura de códigos QR.",
      tecnologias: ["Unity", "Arduino", "Serial Com", "C#"],
      categoria: 'Multimedia',
      urlExterna: "https://github.com/valenyuge"
    },
    {
        id: "endless-runner-js",
        titulo: "Juego 'Endless Runner' Web",
        descripcion: "Motor de juego básico desarrollado desde cero con JavaScript puro.",
        contenidoLargo: "Implementación manual del Game Loop, detección de colisiones (AABB), gravedad y generación procedural de obstáculos, demostrando comprensión de la lógica base de videojuegos.",
        tecnologias: ["JavaScript", "Lógica de Juegos"],
        categoria: 'Videojuegos',
        urlExterna: "https://github.com/valenyuge"
    },
    {
        id: "arcade-versus",
        titulo: "Arcade Sincro Versus 1v1",
        descripcion: "Game Manager central para control de estados y sistema de puntuación.",
        contenidoLargo: "Gestión de temporizadores y sistema de puntuación. Sincronización de animaciones con eventos de lógica y control de interfaz de usuario (UI) para múltiples pantallas.",
        tecnologias: ["Unity", "C#"],
        categoria: 'Videojuegos',
        urlExterna: "https://github.com/valenyuge"
    },
    {
        id: "landing-vorterix",
        titulo: "Landing Page 'Vorterix'",
        descripcion: "Maquetación Full Responsive Pixel Perfect para captura de datos.",
        contenidoLargo: "Enfoque Pixel Perfect respetando la identidad visual de la marca. Programación de lógica para captura y almacenamiento de datos de usuario.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        categoria: 'Web',
        urlExterna: "https://github.com/valenyuge"
    },
    {
        id: "redisenio-gato",
        titulo: "Rediseño 'El Gato y la Caja'",
        descripcion: "Refactorización de interfaz con componentes interactivos reutilizables.",
        contenidoLargo: "Desarrollo de carruseles de imágenes y navegación por breadcrumbs. Optimización de la experiencia de usuario (UX) mediante scripts de interacción.",
        tecnologias: ["JavaScript", "UX", "HTML/CSS"],
        categoria: 'Web',
        urlExterna: "https://github.com/valenyuge"
    },
    {
        id: "todo-list",
        titulo: "To-Do List Profesional",
        descripcion: "App de gestión de tareas con TypeScript y React.",
        contenidoLargo: "Aplicación de gestión de tareas con persistencia de datos, tipado fuerte y diseño moderno. Implementación de estados complejos en React.",
        tecnologias: ["React", "TypeScript", "Tailwind"],
        categoria: 'Web',
        urlExterna: "https://github.com/valenyuge"
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