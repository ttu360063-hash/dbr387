import { DiscordIcon } from './Icons';
import useStore from '../store/useStore';

export default function AboutCommunity() {
  const { about, community } = useStore((state) => state.data);

  return (
    <section className="py-8 pb-16">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card Sobre */}
          <div className="rounded-2xl p-8 relative overflow-hidden h-full" style={{ background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.08), rgba(16, 16, 16, 0.9))', border: '1px solid rgba(229, 9, 20, 0.15)' }}>
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-wider mb-3 font-sans uppercase" dangerouslySetInnerHTML={{ __html: about.titleHTML }}>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {about.description}
              </p>
              <button className="btn-secondary px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest">
                {about.buttonText}
              </button>
            </div>
            <img src={about.image} alt="Sobre" className="absolute right-4 bottom-4 w-28 h-28 object-contain opacity-15" />
          </div>

          {/* Card Comunidade */}
          <div className="rounded-2xl p-8 relative overflow-hidden h-full" style={{ background: 'linear-gradient(135deg, rgba(88, 80, 236, 0.1), rgba(16, 16, 16, 0.9))', border: '1px solid rgba(88, 80, 236, 0.2)' }}>
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-wider mb-3 font-sans uppercase" dangerouslySetInnerHTML={{ __html: community.titleHTML }}>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {community.description}
              </p>
              <a href={community.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest text-white transition-all duration-200 hover:brightness-110" style={{ background: '#5865F2' }}>
                <DiscordIcon className="w-5 h-5 fill-current" />
                {community.buttonText}
              </a>
            </div>
            <div className="absolute right-4 bottom-4 opacity-10 text-[80px]">
              💬
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
