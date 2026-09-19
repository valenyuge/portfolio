import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type Proyecto } from '../data/proyectos'; 
import SelectorIdioma from '../components/SelectorIdioma';
import BotonTema from '../components/BotonTema';
import SeccionContacto from '../components/SeccionContacto';

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
    <div className="min-h-screen bg-[#f4efe6] dark:bg-stone-950 p-4 md:p-8 text-stone-900 dark:text-[#f4efe6] font-sans relative transition-colors duration-300">
      <BotonTema />
      <SelectorIdioma />
      <header className="max-w-5xl mx-auto text-center mb-16 pt-12 md:pt-0"> 
        <h1 className="text-4xl md:text-5xl font-black mb-4 py-2 bg-linear-to-r from-stone-800 to-stone-600 dark:from-[#f4efe6] dark:to-stone-400 bg-clip-text text-transparent">Valentin Yuge</h1>
        <p className="text-stone-700 dark:text-[#d6cfc2] text-base md:text-lg">{t('subtitulo')}</p>
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
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${filtro === cat ? 'bg-stone-900 dark:bg-[#f4efe6] text-[#f4efe6] dark:text-stone-900 border-stone-900 dark:border-[#f4efe6] shadow-lg scale-105' : 'bg-[#e8e1d3] dark:bg-stone-900 border-stone-300/80 dark:border-stone-800 text-stone-700 dark:text-[#d6cfc2] hover:bg-[#ded5c5] dark:hover:bg-stone-800'}`}
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
            className="group block bg-stone-900 dark:bg-[#f4efe6] p-6 md:p-7 rounded-xl border border-stone-800 dark:border-[#e0d6c3] hover:border-stone-600 dark:hover:border-stone-400 transition-all duration-300 hover:-translate-y-2 shadow-lg"
          >
            
            <div className="aspect-video w-full mb-5 overflow-hidden rounded-lg bg-stone-800 dark:bg-[#e8e1d3] relative">
              {p.imagenUrl || p.videoUrl ? (
                <img 
                  src={p.imagenUrl || `/proyectos/${p.id}.png`} 
                  alt={p.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'; }} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#c5baa7] dark:text-stone-500 font-bold">{p.titulo}</div>
              )}
            </div>

            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d8cfbe] dark:text-stone-600 block">
                {p.categoria}
              </span>
              <span className="text-[#c5baa7] dark:text-stone-500 text-[11px] font-bold">
                {formatearPeriodo(p.fechaInicio, p.fechaFin)}
              </span>
            </div>

            <h2 className="text-2xl font-black mb-3 text-[#f4efe6] dark:text-stone-900 group-hover:text-[#dfd7c8] dark:group-hover:text-stone-700 transition-colors">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h2>

            <p className="text-[#e0d8cb] dark:text-stone-700 text-sm mb-6 leading-relaxed line-clamp-2">
              {i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tecnologias.slice(0, 4).map(tech => (
                <span 
                  key={tech} 
                  className="text-[10px] font-bold bg-stone-800 dark:bg-[#e8e1d3] text-[#f4efe6] dark:text-stone-800 px-2.5 py-1 rounded border border-stone-700 dark:border-[#d6cbbb]"
                >
                  {tech}
                </span>
              ))}
              {p.tecnologias.length > 4 && (
                <span className="text-[10px] font-bold text-[#c5baa7] dark:text-stone-500 py-1">+ {p.tecnologias.length - 4}</span>
              )}
            </div>

            <div className="text-[#f4efe6] dark:text-stone-900 text-xs font-black tracking-widest group-hover:underline">{t('detalle_mas')}</div>
          </Link>
        ))}
      </main>
      <SeccionContacto />
    </div>
  );
};

export default GrillaProyectos;