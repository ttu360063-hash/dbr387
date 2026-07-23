import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageFooter() {
  const { footer } = useStore((state) => state.data);
  const updateFooter = useStore((state) => state.updateFooter);
  
  const [data, setData] = useState(footer);

  const handleSave = (e) => {
    e.preventDefault();
    updateFooter(data);
    toast.success('Rodapé salvo com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Rodapé (Footer)</h1>
        <p className="text-gray-400">Edite as informações textuais do rodapé.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Descrição (Coluna 1)</label>
              <textarea rows={3} value={data.description} onChange={e => setData({...data, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto de Copyright</label>
              <input type="text" value={data.copyright} onChange={e => setData({...data, copyright: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Rodapé
          </button>
        </div>
      </form>
    </div>
  );
}
