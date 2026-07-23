import { BarChart, Users, Video, Eye, Settings, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';

export default function Dashboard() {
  const { data } = useStore();

  const stats = [
    { name: 'Total de Vídeos', value: data.recentVideos.length, icon: Video, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Categorias', value: data.categories.length, icon: ImageIcon, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { name: 'Inscritos (Mock)', value: '250K', icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Visualizações', value: '1.2M', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  const quickLinks = [
    { name: 'Editar Hero', path: '/admin/hero', desc: 'Mude o título e a imagem de fundo principal.' },
    { name: 'Novo Vídeo', path: '/admin/videos', desc: 'Adicione um novo vídeo na seção de Vídeos Recentes.' },
    { name: 'SEO & Configs', path: '/admin/settings', desc: 'Ajuste as meta tags e scripts do Google Analytics.' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Bem-vindo ao Painel, Admin!</h1>
        <p className="text-gray-400">Aqui você pode gerenciar todo o conteúdo do site DARKBR387.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#111] border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.name}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mb-6">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link key={link.name} to={link.path} className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors group cursor-pointer block">
            <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">{link.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
