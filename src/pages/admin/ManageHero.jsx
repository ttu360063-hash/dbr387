import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageHero() {
  const { hero } = useStore((state) => state.data);
  const updateHero = useStore((state) => state.updateHero);

  const [background, setBackground] = useState(hero.background);
  const [smallText, setSmallText] = useState(hero.smallText);
  const [titleHTML, setTitleHTML] = useState(hero.titleHTML);
  const [description, setDescription] = useState(hero.description);
  const [primaryButton, setPrimaryButton] = useState(hero.primaryButton);

  const handleSave = (e) => {
    e.preventDefault();
    updateHero({ background, smallText, titleHTML, description, primaryButton });
    toast.success('Hero salvo com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Gerenciar Hero</h1>
        <p className="text-gray-400">Edite a imagem de fundo, título principal e os botões da primeira dobra.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Mídia de Fundo</h2>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">URL da Imagem</label>
            <input 
              type="text" 
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
            />
            {background && (
              <img src={background} alt="Preview" className="mt-4 h-32 w-auto object-cover rounded-lg border border-white/10" />
            )}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Textos Principais</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto Pequeno Superior</label>
              <input 
                type="text" 
                value={smallText}
                onChange={(e) => setSmallText(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Título (HTML Liberado)</label>
              <input 
                type="text" 
                value={titleHTML}
                onChange={(e) => setTitleHTML(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Descrição</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Botão Primário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto</label>
              <input 
                type="text" 
                value={primaryButton.text}
                onChange={(e) => setPrimaryButton({...primaryButton, text: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Link</label>
              <input 
                type="text" 
                value={primaryButton.url}
                onChange={(e) => setPrimaryButton({...primaryButton, url: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Hero
          </button>
        </div>
      </form>
    </div>
  );
}
