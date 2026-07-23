import { Play, Users, Flame } from 'lucide-react';
import { YouTubeIcon } from './Icons';
import useStore from '../store/useStore';

export default function Hero() {
  const { hero } = useStore((state) => state.data);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={hero.background} alt="Hero background" className="w-full h-full object-cover object-center filter brightness-[0.28] saturate-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
      </div>

      <div className="container-max relative z-10 pt-24 pb-20">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.4em] text-red-500 font-semibold mb-4 uppercase">
            {hero.smallText}
          </div>
          
          <h1 
            className="font-black leading-none mb-4 text-[clamp(3.5rem,10vw,7rem)] tracking-[-0.03em] drop-shadow-[0_0_60px_rgba(229,9,20,0.3)] font-sans"
            dangerouslySetInnerHTML={{ __html: hero.titleHTML }}
          >
          </h1>
          
          <p className="text-gray-300 text-base md:text-lg font-medium mb-8 leading-relaxed whitespace-pre-line">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a href={hero.primaryButton.url} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold tracking-wide">
              <Play className="w-4 h-4 fill-white" />
              {hero.primaryButton.text}
            </a>
            <a href={hero.secondaryButton.url} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold tracking-wide">
              {hero.secondaryButton.text}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {hero.stats.map(stat => {
              const Icon = stat.icon === 'youtube' ? YouTubeIcon : stat.icon === 'users' ? Users : Flame;
              const color = stat.icon === 'youtube' ? 'text-red-500' : stat.icon === 'users' ? 'text-indigo-400' : 'text-orange-400';
              return (
                <div key={stat.id} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <div>
                    <div className="text-xl font-black text-white leading-none">{stat.value}</div>
                    <div className="text-xs text-gray-600 tracking-widest font-semibold mt-0.5">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
