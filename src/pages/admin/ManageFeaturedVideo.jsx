import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageFeaturedVideo() {
  const { featuredVideo } = useStore((state) => state.data);
  const updateFeaturedVideo = useStore((state) => state.updateFeaturedVideo);
  
  const [video, setVideo] = useState(featuredVideo);

  const handleSave = (e) => {
    e.preventDefault();
    updateFeaturedVideo(video);
    toast.success('Destaque salvo com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Último Lançamento</h1>
        <p className="text-gray-400">Edite as informações do vídeo em destaque.</p>
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
