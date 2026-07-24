import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';
import { ArrowUp, ArrowDown, Trash2, Plus, Copy } from 'lucide-react';

export default function ManageRecentVideos() {
  const { recentVideos } = useStore((state) => state.data);
  const setRecentVideos = useStore((state) => state.setRecentVideos);
  
  const [videos, setVideos] = useState(recentVideos);

  const handleSave = () => {
    setRecentVideos(videos);
    toast.success('Vídeos salvos com sucesso!');
  };

  const updateVideo = (id, field, value) => {
    setVideos(videos.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVideo = (id) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const addVideo = () => {
    const newVideo = {
      id: Date.now().toString(),
      title: "Novo Vídeo",
      image: "/index_files/4a16b013a2cc80ba2b3ff24d50f20051.webp",
      date: "Agora",
      views: "0",
      duration: "0:00",
      category: "Geral",
      color: "#ffffff"
    };
    setVideos([...videos, newVideo]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newVideos = [...videos];
    [newVideos[index - 1], newVideos[index]] = [newVideos[index], newVideos[index - 1]];
    setVideos(newVideos);
  };

  const moveDown = (index) => {
    if (index === videos.length - 1) return;
    const newVideos = [...videos];
    [newVideos[index + 1], newVideos[index]] = [newVideos[index], newVideos[index + 1]];
    setVideos(newVideos);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">Vídeos Recentes</h1>
          <p className="text-gray-400">Gerencie a lista de vídeos que aparece na home.</p>
        </div>
        <button onClick={addVideo} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm">
          <Plus className="w-4 h-4" />
          Adicionar Manualmente
        </button>
      </div>

      <div className="bg-[#111] border border-red-500/30 rounded-xl p-6 mb-8 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-red-500">▶</span> Adicionar Rápido via YouTube
        </h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <input 
              type="text" 
              id="quick-youtube-url"
              placeholder="Cole o link do vídeo aqui..." 
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm" 
            />
          </div>
          <button 
            type="button" 
            onClick={async () => {
              const input = document.getElementById('quick-youtube-url');
              if (!input.value) return toast.error('Insira o link primeiro.');
              
              const toastId = toast.loading('Buscando vídeo...');
              try {
                const res = await fetch(`/api/youtube?url=${encodeURIComponent(input.value)}`);
                const data = await res.json();
                if (res.ok) {
                  setVideos([{
                    id: Date.now().toString(),
                    title: data.title,
                    image: data.thumbnail,
                    date: "Agora",
                    views: "0",
                    duration: data.duration,
                    category: "Geral",
                    color: "#ffffff"
                  }, ...videos]);
                  toast.success('Vídeo adicionado ao topo!', { id: toastId });
                  input.value = '';
                } else {
                  toast.error(data.error || 'Erro ao buscar dados.', { id: toastId });
                }
              } catch (e) {
                toast.error('Erro de conexão.', { id: toastId });
              }
            }} 
            className="btn-primary px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap h-[46px]"
          >
            Importar Vídeo
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {videos.map((video, index) => (
          <div key={video.id} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-6 group">
            
            {/* Actions / Reorder */}
            <div className="flex flex-col items-center justify-center gap-2 border-r border-white/10 pr-4">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30">
                <ArrowUp className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-gray-600">{index + 1}</span>
              <button onClick={() => moveDown(index)} disabled={index === videos.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30">
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Preview */}
            <div className="w-40 flex-shrink-0">
              <img src={video.image} alt="Thumb" className="w-full aspect-video object-cover rounded-lg border border-white/10" />
            </div>

            {/* Form Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Título</label>
                <input 
                  type="text" value={video.title} onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Categoria</label>
                <input 
                  type="text" value={video.category} onChange={(e) => updateVideo(video.id, 'category', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">URL da Imagem</label>
                <input 
                  type="text" value={video.image} onChange={(e) => updateVideo(video.id, 'image', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 md:col-span-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Data</label>
                  <input 
                    type="text" value={video.date} onChange={(e) => updateVideo(video.id, 'date', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Views</label>
                  <input 
                    type="text" value={video.views} onChange={(e) => updateVideo(video.id, 'views', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Tempo</label>
                  <input 
                    type="text" value={video.duration} onChange={(e) => updateVideo(video.id, 'duration', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delete/Duplicate */}
            <div className="flex flex-col gap-2 justify-center pl-4 border-l border-white/10">
              <button onClick={() => removeVideo(video.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Excluir">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-8 py-3 rounded-lg font-bold">
          Salvar Vídeos
        </button>
      </div>
    </div>
  );
}
