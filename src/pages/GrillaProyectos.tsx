import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type Proyecto } from '../data/proyectos'; 
import SelectorIdioma from '../components/SelectorIdioma';
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
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 p-4 md:p-8 text-stone-900 dark:text-stone-100 font-sans relative">
      <SelectorIdioma />
      <header className="max-w-5xl mx-auto text-center mb-16 pt-12 md:pt-0"> 
        <h1 className="text-4xl md:text-5xl font-black mb-4 py-2 bg-linear-to-r from-stone-600 to-stone-400 dark:from-stone-300 dark:to-stone-500 bg-clip-text text-transparent">Valentin Yuge</h1>
        <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg">{t('subtitulo')}</p>
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
              <button key={cat} onClick={() => setFiltro(cat)} className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${filtro === cat ? 'bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 border-stone-800 dark:border-stone-200 shadow-lg shadow-stone-900/10 dark:shadow-stone-200/10 scale-105 text-stone-900 dark:text-stone-100' : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'}`}>
                {traducciones[cat]}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((p) => (
          <Link key={p.id} to={`/proyecto/${p.id}`} className="group block bg-white dark:bg-stone-800 p-8 rounded-4xl border border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 transition-all duration-500 hover:-translate-y-3 shadow-xl">
            
            <div className="aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-700 relative">
              {p.imagenUrl || p.videoUrl ? (
                <img src={p.imagenUrl || `/proyectos/${p.id}.png`} alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold">{p.titulo}</div>
              )}
            </div>

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 dark:text-stone-200 block">{p.categoria}</span>
              <span className="text-stone-500 dark:text-stone-400 text-[11px] font-bold">{formatearPeriodo(p.fechaInicio, p.fechaFin)}</span>
            </div>

            <h2 className="text-2xl font-black mb-3 group-hover:text-stone-900 dark:text-stone-200 transition-colors">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h2>

            <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 leading-relaxed line-clamp-2">
              {i18n.language.startsWith('es') ? p.descripcion : (p.descripcion_en || p.descripcion)}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {p.tecnologias.slice(0, 4).map(tech => (
                <span key={tech} className="text-[10px] font-bold bg-stone-100 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-md border border-stone-200 dark:border-stone-700">
                  {tech}
                </span>
              ))}
              {p.tecnologias.length > 4 && (
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 py-1">+ {p.tecnologias.length - 4}</span>
              )}
            </div>

            <div className="text-stone-900 dark:text-stone-200 text-xs font-black tracking-widest">{t('detalle_mas')}</div>
          </Link>
        ))}
      </main>
      <SeccionContacto />
    </div>
  );
};

export default GrillaProyectos;