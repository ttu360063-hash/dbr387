import useStore from '../../store/useStore';
import { Play, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function VideoCard({ image, title, date, views, duration, category, color, url }) {
  return (
    <a href={url || '#'} target={url ? "_blank" : "_self"} rel="noopener noreferrer" className="glass-card rounded-xl overflow-hidden cursor-pointer group relative block">
      <div className="relative overflow-hidden aspect-video">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>
      
      <div className="p-3">
        <div className="text-xs font-semibold tracking-wider mb-1 uppercase" style={{ color: color }}>
          {category}
        </div>
        <h3 className="font-semibold text-gray-100 line-clamp-2 group-hover:text-white transition-colors text-sm">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
          <Clock className="w-3 h-3" />
          <span>{date}</span>
          <span>·</span>
          <span>{views} views</span>
        </div>
      </div>
    </a>
  );
}

export default function VideosPage() {
  const { recentVideos } = useStore((state) => state.data);
  const location = useLocation();

  // Determine category based on route
  let categoryFilter = null;
  let title = "TODOS OS VÍDEOS";
  
  if (location.pathname.includes('/corridas')) {
    categoryFilter = 'corridas';
    title = "CORRIDAS";
  } else if (location.pathname.includes('/drift')) {
    categoryFilter = 'drift';
    title = "DRIFT";
  } else if (location.pathname.includes('/gameplays')) {
    categoryFilter = 'gameplays';
    title = "GAMEPLAYS";
  } else if (location.pathname.includes('/desafios')) {
    categoryFilter = 'desafios';
    title = "DESAFIOS";
  }

  const filteredVideos = categoryFilter 
    ? recentVideos.filter(v => v.category.toLowerCase().includes(categoryFilter))
    : recentVideos;

  return (
    <div className="pt-32 pb-24 container-max min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <div className="red-line"></div>
        <h1 className="text-4xl font-black tracking-wider font-sans uppercase">
          {title}
        </h1>
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/5">
          <h2 className="text-2xl font-bold text-gray-500">Nenhum vídeo encontrado nesta categoria.</h2>
        </div>
      )}
    </div>
  );
}
