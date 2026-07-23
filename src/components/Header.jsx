import { Menu } from 'lucide-react';
import { TikTokIcon, YouTubeIcon, DiscordIcon } from './Icons';
import useStore from '../store/useStore';

export default function Header() {
  const { header } = useStore((state) => state.data);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent transition-all duration-300">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-red-600 flex-shrink-0">
              <img src={header.logo} alt={header.brandName} className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tight hidden sm:block font-sans" dangerouslySetInnerHTML={{ __html: header.brandName.replace('BR387', '<span class="text-red-500">BR387</span>') }}>
            </span>
          </button>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-6">
            {header.menu.map((item, i) => (
              <a key={item.id} href={item.link} className={`nav-link text-xs font-semibold tracking-widest transition-colors ${i === 0 ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Socials & Button */}
          <div className="hidden md:flex items-center gap-3">
            {header.socials.map((social) => {
              const Icon = social.platform === 'tiktok' ? TikTokIcon : social.platform === 'youtube' ? YouTubeIcon : DiscordIcon;
              const hoverColor = social.platform === 'youtube' ? 'hover:text-red-500' : social.platform === 'discord' ? 'hover:text-[#5865F2]' : 'hover:text-white';
              
              return (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className={`text-gray-500 transition-colors ${hoverColor}`}>
                  <Icon className={`w-4 h-4 ${social.platform !== 'youtube' ? 'fill-current' : ''}`} />
                </a>
              );
            })}
            <button className="btn-primary ml-2 px-4 py-2 text-xs font-bold tracking-widest rounded-md">
              {header.buttonText}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
