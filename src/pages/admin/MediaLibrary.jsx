import { useState } from 'react';
import toast from 'react-hot-toast';
import { Copy, Plus, Trash2 } from 'lucide-react';

export default function MediaLibrary() {
  const [media, setMedia] = useState([
    { id: '1', name: 'Hero Background', url: '/index_files/fffb3ebf4690d41080aa571506e6cb09.webp' },
    { id: '2', name: 'Logo Principal', url: '/index_files/411c8ff49c773fe065f636fe6df6f1ba.webp' },
    { id: '3', name: 'Thumb Forza', url: '/index_files/4a16b013a2cc80ba2b3ff24d50f20051.webp' },
  ]);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada para a área de transferência!');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    setMedia([{ id: Date.now().toString(), name: newName || 'Nova Mídia', url: newUrl }, ...media]);
    setNewUrl('');
    setNewName('');
    toast.success('Mídia adicionada!');
  };

  const removeMedia = (id) => {
    setMedia(media.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Biblioteca de Mídia</h1>
        <p className="text-gray-400">Guarde seus links de imagens aqui para copiar rapidamente quando precisar.</p>
      </div>

      <form onSubmit={handleAdd} className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-400 mb-2">Nome (Opcional)</label>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-400 mb-2">URL da Imagem</label>
          <input type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} required className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
        </div>
        <button type="submit" className="btn-primary px-6 py-3 rounded-lg font-bold flex items-center gap-2 h-[50px]">
          <Plus className="w-5 h-5" /> Adicionar
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {media.map(item => (
          <div key={item.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden group">
            <div className="aspect-video bg-[#0a0a0a] relative">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => handleCopy(item.url)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white" title="Copiar URL">
                  <Copy className="w-5 h-5" />
                </button>
                <button onClick={() => removeMedia(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500" title="Excluir">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-sm font-bold truncate">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
