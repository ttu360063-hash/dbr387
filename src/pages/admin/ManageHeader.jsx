import { useState } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ManageHeader() {
  const { header } = useStore((state) => state.data);
  const updateHeader = useStore((state) => state.updateHeader);

  const [brandName, setBrandName] = useState(header.brandName);
  const [logo, setLogo] = useState(header.logo);
  const [buttonText, setButtonText] = useState(header.buttonText);
  const [menu, setMenu] = useState(header.menu);

  const handleSave = (e) => {
    e.preventDefault();
    updateHeader({ brandName, logo, buttonText, menu });
    toast.success('Header salvo com sucesso!');
  };

  const updateMenuItem = (id, field, value) => {
    setMenu(menu.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Gerenciar Header</h1>
        <p className="text-gray-400">Edite a logo, o nome da marca e os links do menu principal.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Informações Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Nome da Marca (Use 'BR387' para o texto vermelho)</label>
              <input 
                type="text" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">URL da Logo</label>
              <input 
                type="text" 
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Texto do Botão Principal</label>
              <input 
                type="text" 
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Itens do Menu</h2>
          <div className="space-y-4">
            {menu.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-lg border border-white/5">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Rótulo</label>
                  <input 
                    type="text" 
                    value={item.label}
                    onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">URL / Link</label>
                  <input 
                    type="text" 
                    value={item.link}
                    onChange={(e) => updateMenuItem(item.id, 'link', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note: The global Save button in AdminLayout could also trigger this if we used Context, but for simplicity we add a local save button here as well, or just rely on React state */}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary px-8 py-3 rounded-lg font-bold">
            Salvar Header
          </button>
        </div>
      </form>
    </div>
  );
}
