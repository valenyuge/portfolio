const VisualizadorDocumento = ({ url, titulo }: { url?: string, titulo: string }) => {
  if (!url) return null;

  return (
    <div className="mt-16 space-y-6 w-full"> 
      <h3 className="text-xl font-bold text-stone-900 dark:text-[#fdf6e3] border-b border-stone-300 dark:border-stone-800 pb-4 tracking-tight">
        {titulo}
      </h3>
      <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-stone-800 dark:border-[#d6cbbb] bg-stone-900 dark:bg-[#fdf6e3] shadow-2xl">
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

export default VisualizadorDocumento;
