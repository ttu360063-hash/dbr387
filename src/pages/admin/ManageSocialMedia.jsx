import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function ManageSocialMedia() {
  const { socialMediaCards } = useStore((state) => state.data);
  const setSocialMediaCards = useStore((state) => state.setSocialMediaCards);
  
  const [cards, setCards] = useState(socialMediaCards);

  const handleSave = () => {
    setSocialMediaCards(cards);
    toast.success('Redes sociais salvas com sucesso!');
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const addCard = () => {
    setCards([...cards, {
      id: Date.now().toString(),
      platform: "tiktok",
      name: "NOVA REDE",
      user: "@usuario",
      url: "#",
      buttonText: "SEGUIR",
      bgColor: "bg-gray-800",
      textColor: "text-white"
    }]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newCards = [...cards];
    [newCards[index - 1], newCards[index]] = [newCards[index], newCards[index - 1]];
    setCards(newCards);
  };

  const moveDown = (index) => {
    if (index === cards.length - 1) return;
    const newCards = [...cards];
    [newCards[index + 1], newCards[index]] = [newCards[index], newCards[index + 1]];
    setCards(newCards);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">Redes Sociais</h1>
          <p className="text-gray-400">Gerencie os cards das redes sociais.</p>
        </div>
        <button onClick={addCard} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm">
          <Plus className="w-4 h-4" />
          Adicionar Rede
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {cards.map((card, index) => (
          <div key={card.id} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-6">
            
            <div className="flex flex-col items-center justify-center gap-2 border-r border-white/10 pr-4">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30"><ArrowUp className="w-5 h-5"/></button>
              <button onClick={() => moveDown(index)} disabled={index === cards.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30"><ArrowDown className="w-5 h-5"/></button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Ícone (Plataforma)</label>
                <select value={card.platform} onChange={e => updateCard(card.id, 'platform', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none">
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="discord">Discord</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nome</label>
                <input type="text" value={card.name} onChange={e => updateCard(card.id, 'name', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Usuário</label>
                <input type="text" value={card.user} onChange={e => updateCard(card.id, 'user', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">URL (Link)</label>
                <input type="text" value={card.url} onChange={e => updateCard(card.id, 'url', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Texto do Botão</label>
                <input type="text" value={card.buttonText} onChange={e => updateCard(card.id, 'buttonText', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center pl-4 border-l border-white/10">
              <button onClick={() => removeCard(card.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Excluir">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-8 py-3 rounded-lg font-bold">
          Salvar Redes Sociais
        </button>
      </div>
    </div>
  );
}
