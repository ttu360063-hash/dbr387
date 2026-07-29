import { useState, useEffect } from 'react';
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
  const [secondaryButton, setSecondaryButton] = useState(hero.secondaryButton || { text: '', url: '' });
  const [stats, setStats] = useState(hero.stats || []);

  useEffect(() => {
    updateHero({ background, smallText, titleHTML, description, primaryButton, secondaryButton, stats });
  }, [background, smallText, titleHTML, description, primaryButton, secondaryButton, stats, updateHero]);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Hero salvo localmente! (Não esqueça de Publicar)');
  };

  const updateStat = (id, field, value) => {
    setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
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
          <h2 className="text-xl font-bold mb-6">Botões</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="border border-white/5 p-4 rounded-lg">
              <h3 className="text-sm font-bold mb-4 text-gray-300">Botão Primário</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Texto</label>
                  <input 
                    type="text" 
                    value={primaryButton.text}
                    onChange={(e) => setPrimaryButton({...primaryButton, text: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Link</label>
                  <input 
                    type="text" 
                    value={primaryButton.url}
                    onChange={(e) => setPrimaryButton({...primaryButton, url: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="border border-white/5 p-4 rounded-lg">
              <h3 className="text-sm font-bold mb-4 text-gray-300">Botão Secundário</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Texto</label>
                  <input 
                    type="text" 
                    value={secondaryButton.text}
                    onChange={(e) => setSecondaryButton({...secondaryButton, text: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Link</label>
                  <input 
                    type="text" 
                    value={secondaryButton.url}
                    onChange={(e) => setSecondaryButton({...secondaryButton, url: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="border border-white/5 p-4 rounded-lg">
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase">{stat.icon}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Valor (ex: +250K)</label>
                    <input 
                      type="text" 
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Rótulo (ex: INSCRITOS)</label>
                    <input 
                      type="text" 
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
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
