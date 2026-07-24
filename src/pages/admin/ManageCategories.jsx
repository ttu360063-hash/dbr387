import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';
import { ArrowUp, ArrowDown, Trash2, Plus, Copy } from 'lucide-react';

export default function ManageCategories() {
  const { categories } = useStore((state) => state.data);
  const setCategories = useStore((state) => state.setCategories);
  
  const [cats, setCats] = useState(categories);

  useEffect(() => {
    setCategories(cats);
  }, [cats, setCategories]);

  const handleSave = () => {
    toast.success('Categorias salvas localmente! (Não esqueça de Publicar)');
  };

  const updateCat = (id, field, value) => {
    setCats(cats.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCat = (id) => {
    setCats(cats.filter(c => c.id !== id));
  };

  const duplicateCat = (cat) => {
    setCats([...cats, { ...cat, id: Date.now().toString(), name: cat.name + ' (Cópia)' }]);
  };

  const addCat = () => {
    setCats([...cats, {
      id: Date.now().toString(),
      name: "Nova Categoria",
      count: 0,
      image: "",
      color: "#ffffff",
      bgFilter: "brightness(0.35) saturate(1.2)"
    }]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newCats = [...cats];
    [newCats[index - 1], newCats[index]] = [newCats[index], newCats[index - 1]];
    setCats(newCats);
  };

  const moveDown = (index) => {
    if (index === cats.length - 1) return;
    const newCats = [...cats];
    [newCats[index + 1], newCats[index]] = [newCats[index], newCats[index + 1]];
    setCats(newCats);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">Categorias</h1>
          <p className="text-gray-400">Gerencie as categorias de vídeos da home.</p>
        </div>
        <button onClick={addCat} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm">
          <Plus className="w-4 h-4" />
          Nova Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cats.map((cat, index) => (
          <div key={cat.id} className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col gap-4 relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#0a0a0a] rounded-lg border border-white/10 p-1 z-10">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 hover:text-white text-gray-500 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
              <button onClick={() => moveDown(index)} disabled={index === cats.length - 1} className="p-1 hover:text-white text-gray-500 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              <button onClick={() => duplicateCat(cat)} className="p-1 hover:text-blue-400 text-gray-500"><Copy className="w-4 h-4"/></button>
              <button onClick={() => removeCat(cat.id)} className="p-1 hover:text-red-500 text-gray-500"><Trash2 className="w-4 h-4"/></button>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden shrink-0 mt-8">
                {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">Sem Foto</div>}
              </div>
              <div className="flex-1 space-y-3 mt-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Nome</label>
                  <input type="text" value={cat.name} onChange={e => updateCat(cat.id, 'name', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">URL Imagem</label>
                    <input type="text" value={cat.image} onChange={e => updateCat(cat.id, 'image', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:border-red-500 outline-none" />
                  </div>
                  <div className="w-16">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Cor</label>
                    <input type="color" value={cat.color} onChange={e => updateCat(cat.id, 'color', e.target.value)} className="w-full h-[34px] bg-[#0a0a0a] border border-white/10 rounded-md cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-8 py-3 rounded-lg font-bold">
          Salvar Categorias
        </button>
      </div>
    </div>
  );
}
