import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Main Core Blob - Intense Red */}
      <motion.div
        animate={{
          x: ['0%', '30%', '-20%', '0%'],
          y: ['0%', '-30%', '20%', '0%'],
          scale: [1, 1.4, 0.8, 1],
          rotate: [0, 90, -90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-red-600/30 blur-[100px] mix-blend-screen"
      />
      
      {/* Accent Blob - Fiery Orange */}
      <motion.div
        animate={{
          x: ['0%', '-40%', '30%', '0%'],
          y: ['0%', '40%', '-30%', '0%'],
          scale: [1, 0.7, 1.3, 1],
          rotate: [0, -180, 180, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#ff4500]/25 blur-[120px] mix-blend-screen"
      />

      {/* Deep Shadow Blob - Dark Crimson for Contrast */}
      <motion.div
        animate={{
          x: ['0%', '25%', '-25%', '0%'],
          y: ['0%', '25%', '-15%', '0%'],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[10%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#800000]/40 blur-[140px] mix-blend-multiply"
      />

      {/* Small Bright Highlight */}
      <motion.div
        animate={{
          x: ['0vw', '50vw', '-30vw', '0vw'],
          y: ['0vh', '-30vh', '40vh', '0vh'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] left-[10%] w-[20vw] h-[20vw] rounded-full bg-red-500/20 blur-[80px] mix-blend-screen"
      />
      
      {/* Noise Texture Overlay to make it feel premium */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
    </div>
  );
}
