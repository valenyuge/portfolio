import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type Proyecto } from '../data/proyectos'; 
import BarraNavegacion from '../components/BarraNavegacion';
import SeccionContacto from '../components/SeccionContacto';

const GrillaProyectos = ({ proyectos }: { proyectos: Proyecto[] }) => {
  const { t, i18n } = useTranslation();
  const [filtro, setFiltro] = useState('Todos');

  const proyectosOrdenados = [...proyectos].sort((a, b) => new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime());
  
  const formatearPeriodo = (inicio: string, fin: string, enProceso?: boolean) => {
    const limpiar = (f: string) => f.split('-').reverse().join('/');
    if (enProceso) {
      return i18n.language.startsWith('es') 
        ? `${limpiar(inicio)} — En proceso` 
        : `${limpiar(inicio)} — In progress`;
    }
    return inicio === fin ? limpiar(inicio) : `${limpiar(inicio)} — ${limpiar(fin)}`;
  };

  const obtenerNombreCategoria = (cat: string) => {
    if (cat === 'Multimedia') {
      return i18n.language.startsWith('es') ? 'Instalaciones & Hardware' : 'Creative Tech';
    }
    if (cat === 'Videojuegos') {
      return i18n.language.startsWith('es') ? 'Videojuegos' : 'Games';
    }
    return cat;
  };

  const renderTituloCard = (p: Proyecto) => {
    const isEs = i18n.language.startsWith('es');
    const texto = isEs ? p.titulo : (p.titulo_en || p.titulo);
    
    if (p.id === 'todo-list') {
      return isEs ? (
        <>Gestor de Tareas <br /> Full Stack</>
      ) : (
        <>Full Stack <br /> Task Manager</>
      );
    }
    if (p.id === 'runner-vr') {
      return isEs ? (
        <>Hora Pico: <br /> Unity VR Mobile</>
      ) : (
        <>Rush Hour: <br /> Unity Mobile VR</>
      );
    }
    if (p.id === 'influencers-ia') {
      return isEs ? (
        <>InfluencIA: <br /> Instalación Física</>
      ) : (
        <>InfluencIA: <br /> Physical Installation</>
      );
    }
    if (p.id === 'win98') {
      return isEs ? (
        <>OS Interactivo: <br /> Historia de la IA</>
      ) : (
        <>Interactive OS: <br /> History of AI</>
      );
    }
    if (p.id === 'audio-reactiva') {
      return isEs ? (
        <>Voice Brush: <br /> Arte Generativo</>
      ) : (
        <>Voice Brush: <br /> Generative Art</>
      );
    }
    if (p.id === 'arcade-versus') {
      return isEs ? (
        <>Arcade: <br /> Amargados 1v1</>
      ) : (
        <>Arcade: <br /> Amargados 1v1</>
      );
    }
    return texto;
  };

  const filtrados = filtro === 'Todos' ? proyectosOrdenados : proyectosOrdenados.filter(p => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#F3EFE6] dark:bg-[#141312] p-4 md:p-8 text-stone-900 dark:text-[#F3EFE6] font-geist relative transition-colors duration-300">
      <BarraNavegacion />
      
      <header className="max-w-5xl mx-auto text-center mb-16 pt-16 md:pt-14"> 
        <h1 className="font-clash font-bold text-4xl sm:text-5xl md:text-6xl tracking-wide mb-2 py-1 bg-linear-to-r from-stone-900 to-stone-700 dark:from-[#F3EFE6] dark:to-[#A39E93] bg-clip-text text-transparent">
          Valentin Yuge
        </h1>
        <p className="font-geist text-stone-700 dark:text-[#A39E93] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {t('subtitulo')}
        </p>
      </header>

      <nav className="relative max-w-full overflow-hidden mb-12 md:mb-16">
        <div className="flex overflow-x-auto no-scrollbar pb-4 gap-4 px-4 md:justify-center">
          {['Todos', 'Web', 'Videojuegos', 'Multimedia'].map(cat => {
            const traducciones: Record<string, string> = {
              'Todos': i18n.language.startsWith('es') ? 'Todos' : 'All',
              'Web': 'Web',
              'Videojuegos': i18n.language.startsWith('es') ? 'Videojuegos' : 'Games',
              'Multimedia': i18n.language.startsWith('es') ? 'Instalaciones & Hardware' : 'Creative Tech'
            };
            const esActivo = filtro === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setFiltro(cat)} 
                className={`font-geist whitespace-nowrap px-3 py-1.5 text-sm transition-all duration-300 cursor-pointer ${
                  esActivo 
                    ? 'font-bold underline decoration-2 decoration-[#C25E2E] underline-offset-8 text-stone-950 dark:text-[#F3EFE6]' 
                    : 'font-medium text-stone-600 dark:text-[#A39E93] hover:text-[#C25E2E] dark:hover:text-[#D96B34]'
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
            className="group block bg-[#1E1D1A] dark:bg-[#1E1D1A] hover:bg-[#252420] dark:hover:bg-[#22201D] p-6 md:p-7 rounded-xl border border-stone-800/80 dark:border-[#2C2A26] hover:border-[#C25E2E]/60 dark:hover:border-[#C25E2E]/60 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-black/15 dark:shadow-black/40"
          >
            {/* Vista previa con borde fino */}
            <div className="aspect-video w-full mb-5 overflow-hidden rounded-lg bg-[#252420] dark:bg-[#181715] relative border border-white/5 dark:border-[#2C2A26]">
              {p.imagenUrl || p.videoUrl ? (
                <img 
                  src={p.imagenUrl || `/proyectos/${p.id}.png`} 
                  alt={p.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'; }} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#A39E93] font-bold p-4 text-center">
                  {p.titulo}
                </div>
              )}
            </div>

            {/* Metadatos en JetBrains Mono */}
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C25E2E] dark:text-[#D96B34] block">
                {obtenerNombreCategoria(p.categoria)}
              </span>
              <span className="font-mono text-[#A39E93] text-[11px] font-medium shrink-0">
                {formatearPeriodo(p.fechaInicio, p.fechaFin, p.enProceso)}
              </span>
            </div>

            {/* Título en Clash Display Bold con espaciado entre letras */}
            <h2 className="font-clash font-bold text-xl md:text-2xl tracking-wide mb-2.5 text-[#F3EFE6] group-hover:text-[#C25E2E] dark:group-hover:text-[#D96B34] transition-colors leading-snug">
              {renderTituloCard(p)}
            </h2>

            {/* Descripción en Geist */}
            <p className="font-geist text-[#A39E93] text-sm mb-6 leading-relaxed line-clamp-2">
              {i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}
            </p>

            {/* Píldoras de tecnologías en JetBrains Mono */}
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tecnologias.slice(0, 4).map(tech => (
                <span 
                  key={tech} 
                  className="font-mono text-[11px] font-normal bg-[#282622] text-[#F3EFE6] px-2.5 py-1 rounded border border-[#38352F] group-hover:border-[#C25E2E]/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {p.tecnologias.length > 4 && (
                <span className="font-mono text-[11px] font-normal text-[#A39E93] py-1">+ {p.tecnologias.length - 4}</span>
              )}
            </div>

            {/* Botón de ver detalles en JetBrains Mono */}
            <div className="font-mono text-xs font-bold tracking-wider text-[#F3EFE6] group-hover:text-[#C25E2E] dark:group-hover:text-[#D96B34] transition-colors flex items-center gap-1.5">
              <span>{t('detalle_mas')}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </main>

      <SeccionContacto />
    </div>
  );
};

export default GrillaProyectos;
