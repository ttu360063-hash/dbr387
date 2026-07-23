import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ManageSettings() {
  const [activeTab, setActiveTab] = useState('seo');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Configurações salvas (MOCK)!');
  };

  const tabs = [
    { id: 'seo', label: 'SEO & Infos' },
    { id: 'analytics', label: 'Analytics & Pixels' },
    { id: 'appearance', label: 'Aparência' },
    { id: 'features', label: 'Recursos' },
    { id: 'security', label: 'Segurança & Backup' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Configurações Gerais</h1>
        <p className="text-gray-400">Controle o SEO, scripts externos, cores base e segurança do painel.</p>
      </div>

      <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-[#111] border border-white/10 rounded-xl p-6">
        
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Informações do Site</h2>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Nome do Site</label>
              <input type="text" defaultValue="DARKBR387" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Meta Description (SEO)</label>
              <textarea rows={3} defaultValue="O portal oficial do DarkBr387." className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Keywords (Palavras-chave)</label>
              <input type="text" defaultValue="drift, gta, corrida, darkbr387" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Tags e Pixels</h2>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Google Analytics (ID)</label>
              <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Meta Pixel (ID)</label>
              <input type="text" placeholder="1234567890" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
        )}

        {/* Placeholder para as outras abas */}
        {['appearance', 'features', 'security'].includes(activeTab) && (
          <div className="py-12 text-center text-gray-500">
            Interface simulada para demonstração.
          </div>
        )}

        <div className="flex justify-end mt-8 border-t border-white/10 pt-6">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
