import { Play, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import useStore from '../store/useStore';

function VideoCard({ image, title, date, views, duration, category, color }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden cursor-pointer group relative">
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
    </div>
  );
}

export default function RecentVideos() {
  const { recentVideos } = useStore((state) => state.data);

  return (
    <section className="py-16">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="red-line"></div>
            <h2 className="text-xl font-black tracking-wider font-sans uppercase">
              VÍDEOS RECENTES
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-secondary px-3 py-2 rounded-lg text-xs font-bold tracking-widest">
              VER TODOS
            </button>
            <button className="btn-secondary p-2 rounded-md disabled:opacity-50" aria-label="Anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="btn-secondary p-2 rounded-md" aria-label="Próximo">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
