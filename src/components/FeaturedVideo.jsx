import { Play } from 'lucide-react';
import { YouTubeIcon } from './Icons';
import useStore from '../store/useStore';

export default function FeaturedVideo() {
  const { featuredVideo } = useStore((state) => state.data);

  return (
    <section className="relative py-6">
      <div className="container-max">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Image Mockup */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[280px] group cursor-pointer overflow-hidden">
              <img 
                src={featuredVideo.image} 
                alt={featuredVideo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-red-600/40">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded tracking-wider uppercase">
                {featuredVideo.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-1 rounded">
                {featuredVideo.duration}
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest text-red-500 mb-2 uppercase">
                  {featuredVideo.smallTitle}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                  {featuredVideo.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {featuredVideo.category} • {featuredVideo.info}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {featuredVideo.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <a href={featuredVideo.button.url} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold w-fit">
                  <YouTubeIcon className="w-4 h-4" />
                  {featuredVideo.button.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
