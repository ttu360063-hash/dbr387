import { TikTokIcon, YouTubeIcon, DiscordIcon } from './Icons';
import useStore from '../store/useStore';

export default function SocialMedia() {
  const { socialMediaCards } = useStore((state) => state.data);

  return (
    <section className="py-8 pb-20">
      <div className="container-max">
        <div className="flex items-center gap-4 mb-8">
          <div className="red-line"></div>
          <h2 className="text-xl font-black tracking-wider font-sans uppercase">
            ME SIGA NAS REDES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialMediaCards.map((card) => {
            const Icon = card.platform === 'tiktok' ? TikTokIcon : card.platform === 'youtube' ? YouTubeIcon : DiscordIcon;
            
            return (
              <div key={card.id} className="glass-card flex items-center justify-between p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                    <Icon className={`w-5 h-5 ${card.textColor} ${card.platform !== 'youtube' ? 'fill-current' : ''}`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase">{card.name}</div>
                    <div className="text-xs text-gray-500">{card.user}</div>
                  </div>
                </div>
                <a href={card.url} target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-widest transition-all hover:brightness-110 ${card.bgColor} ${card.textColor} ${card.platform === 'tiktok' ? 'btn-secondary' : ''}`}>
                  {card.buttonText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
