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
          className="absolute top-0 left-0 w-full h-full border-none touch-pan-y"
          allow="autoplay; fullscreen; vr"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VisualizadorDocumento;