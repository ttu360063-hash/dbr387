import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageFeaturedVideo() {
  const { featuredVideo } = useStore((state) => state.data);
  const updateFeaturedVideo = useStore((state) => state.updateFeaturedVideo);
  
  const [video, setVideo] = useState(featuredVideo);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    updateFeaturedVideo(video);
  }, [video, updateFeaturedVideo]);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Destaque salvo localmente! (Não esqueça de Publicar)');
  };

  const handleAutoFill = async () => {
    if (!youtubeUrl) return toast.error('Insira o link do YouTube primeiro.');
    
    setIsFetching(true);
    const toastId = toast.loading('Buscando dados no YouTube...');

    try {
      const res = await fetch(`/api/youtube?url=${encodeURIComponent(youtubeUrl)}`);
      const data = await res.json();

      if (res.ok) {
        setVideo({
          ...video,
          title: data.title,
          description: data.description,
          image: data.thumbnail,
          duration: data.duration,
          button: { ...video.button, url: data.url }
        });
        toast.success('Dados preenchidos com sucesso!', { id: toastId });
        setYoutubeUrl(''); // Clear the input
      } else {
        toast.error(data.error || 'Erro ao buscar dados do YouTube.', { id: toastId });
      }
    } catch (error) {
      toast.error('Erro de conexão com o servidor.', { id: toastId });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Último Lançamento</h1>
        <p className="text-gray-400">Edite as informações do vídeo em destaque.</p>
      </div>

      {/* AUTO-FILL SECTION */}
      <div className="bg-[#111] border border-red-500/30 rounded-xl p-6 mb-8 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span className="text-red-500">▶</span> Auto-preenchimento
        </h2>
        <p className="text-gray-400 text-sm mb-4">Cole o link do YouTube para preencher todos os campos de uma vez.</p>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={youtubeUrl} 
              onChange={e => setYoutubeUrl(e.target.value)} 
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" 
            />
          </div>
          <button 
            type="button" 
            onClick={handleAutoFill} 
            disabled={isFetching}
            className="btn-secondary px-6 py-3 rounded-lg font-bold disabled:opacity-50 h-[50px] whitespace-nowrap"
          >
            {isFetching ? 'Buscando...' : 'Preencher Magicamente'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Informações Gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Pequeno Título</label>
              <input type="text" value={video.smallTitle} onChange={e => setVideo({...video, smallTitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Título do Vídeo</label>
              <input type="text" value={video.title} onChange={e => setVideo({...video, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Categoria</label>
              <input type="text" value={video.category} onChange={e => setVideo({...video, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Tempo / Duração</label>
              <input type="text" value={video.duration} onChange={e => setVideo({...video, duration: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Thumbnail (URL)</label>
              <input type="text" value={video.image} onChange={e => setVideo({...video, image: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Descrição</label>
              <textarea rows={3} value={video.description} onChange={e => setVideo({...video, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto do Botão</label>
              <input type="text" value={video.button.text} onChange={e => setVideo({...video, button: {...video.button, text: e.target.value}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Link do Botão (YouTube)</label>
              <input type="text" value={video.button.url} onChange={e => setVideo({...video, button: {...video.button, url: e.target.value}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Último Lançamento
          </button>
        </div>
      </form>
    </div>
  );
}
