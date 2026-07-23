import { Link, useLocation } from 'react-router-dom';
import { Home, Image, Layout, Layers, Box, Settings, LogOut, CheckSquare } from 'lucide-react';
import useStore from '../store/useStore';

export default function Sidebar() {
  const location = useLocation();
  const logout = useStore((state) => state.logout);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Header', icon: Layout, path: '/admin/header' },
    { name: 'Hero', icon: Image, path: '/admin/hero' },
    { name: 'Último Lançamento', icon: CheckSquare, path: '/admin/featured' },
    { name: 'Vídeos Recentes', icon: Box, path: '/admin/videos' },
    { name: 'Categorias', icon: Layers, path: '/admin/categories' },
    { name: 'Sobre', icon: Layout, path: '/admin/about' },
    { name: 'Comunidade', icon: Layout, path: '/admin/community' },
    { name: 'Redes Sociais', icon: Layout, path: '/admin/social' },
    { name: 'Footer', icon: Layout, path: '/admin/footer' },
  ];

  return (
    <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-black text-white tracking-wider font-sans">
          DARK<span className="text-red-500">BR387</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
          Gerenciar Conteúdo
        </div>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-semibold ${isActive ? 'bg-red-500/10 text-red-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mt-8">
          Sistema
        </div>
        <nav className="space-y-1 px-2">
          <Link to="/admin/media" className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5">
            <Image className="w-4 h-4" />
            Mídias
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5">
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-colors text-sm font-semibold text-gray-400 hover:text-red-500 hover:bg-red-500/10">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
