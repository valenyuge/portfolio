const VisualizadorDocumento = ({ url, titulo }: { url?: string, titulo: string }) => {
  if (!url) return null;

  return (
    <div className="mt-16 space-y-6 w-full"> 
      <h3 className="font-clash font-bold text-base md:text-xl tracking-tight text-stone-900 dark:text-[#F3EFE6] border-b border-stone-300 dark:border-[#2C2A26] pb-4">
        {titulo}
      </h3>
      <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-stone-800/80 dark:border-[#2C2A26] bg-[#1E1D1A] shadow-2xl">
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
