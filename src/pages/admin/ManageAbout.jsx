import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageAbout() {
  const { about } = useStore((state) => state.data);
  const updateAbout = useStore((state) => state.updateAbout);
  
  const [data, setData] = useState(about);

  const handleSave = (e) => {
    e.preventDefault();
    updateAbout(data);
    toast.success('Sobre salvo com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Sobre o DarkBR387</h1>
        <p className="text-gray-400">Edite as informações da seção Sobre.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Título (HTML Liberado)</label>
              <input type="text" value={data.titleHTML} onChange={e => setData({...data, titleHTML: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Descrição Completa</label>
              <textarea rows={4} value={data.description} onChange={e => setData({...data, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto do Botão</label>
              <input type="text" value={data.buttonText} onChange={e => setData({...data, buttonText: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Imagem de Fundo (URL)</label>
              <input type="text" value={data.image} onChange={e => setData({...data, image: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Sobre
          </button>
        </div>
      </form>
    </div>
  );
}
