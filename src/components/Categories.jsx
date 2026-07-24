import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

function CategoryCard({ image, name, count, color, bgFilter }) {
  // Safe category link (e.g. "Corridas" -> "/corridas", "Gameplays" -> "/gameplays")
  const catLink = `/${name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Link to={catLink} className="w-full block relative rounded-xl overflow-hidden text-left group min-h-[160px]">
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ filter: bgFilter }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}30 0%, rgba(0, 0, 0, 0.6) 100%)` }}></div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}></div>
      
      <div className="relative z-10 p-5">
        <div className="text-sm font-black tracking-wider mb-1 font-sans uppercase" style={{ color: color }}>
          {name}
        </div>
        <div className="text-xs font-bold mt-2 text-white/80">
          {count} vídeos
        </div>
      </div>
    </Link>
  );
}

export default function Categories() {
  const { categories } = useStore((state) => state.data);

  return (
    <section className="py-8 pb-16">
      <div className="container-max">
        <div className="flex items-center gap-4 mb-8">
          <div className="red-line"></div>
          <h2 className="text-xl font-black tracking-wider font-sans uppercase">
            CATEGORIAS
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
