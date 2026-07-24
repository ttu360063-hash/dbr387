import { TikTokIcon, YouTubeIcon, DiscordIcon } from './Icons';
import { ExternalLink } from 'lucide-react';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { header, footer, socialMediaCards } = useStore((state) => state.data);

  return (
    <footer className="relative border-t pt-16 pb-8 border-white/5 bg-[#080808]">
      <div className="container-max">
        
        {/* Top 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600">
                <img src={header.logo} alt={header.brandName} className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black font-sans tracking-tight" dangerouslySetInnerHTML={{ __html: header.brandName.replace('BR387', '<span class="text-red-500">BR387</span>') }}>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              {footer.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {header.socials.map((social) => {
                const Icon = social.platform === 'tiktok' ? TikTokIcon : social.platform === 'youtube' ? YouTubeIcon : DiscordIcon;
                const hoverColor = social.platform === 'youtube' ? 'hover:text-red-500 hover:bg-red-500/5' : social.platform === 'discord' ? 'hover:text-indigo-400 hover:bg-indigo-400/5' : 'hover:text-white hover:bg-white/5';
                
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg text-gray-500 transition-all duration-200 ${hoverColor}`}>
                    <Icon className={`w-5 h-5 ${social.platform !== 'youtube' ? 'fill-current' : ''}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-4">Navegação</h4>
            <ul className="space-y-3">
              {header.menu.map((item) => (
                <li key={item.id}>
                  <Link to={item.link} className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-4">Comunidade</h4>
            <ul className="space-y-3">
              {socialMediaCards.map((card) => (
                <li key={card.id}>
                  <a href={card.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-2 capitalize">
                    {card.platform} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <span>{footer.copyright}</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
