import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Pulsing Logo Circle */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-32 h-32 rounded-full bg-red-600/20 blur-xl"
            />
            
            {/* Brand Text */}
            <div className="relative z-10 text-3xl font-black tracking-widest font-sans flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 mb-2">
                <img src="/index_files/411c8ff49c773fe065f636fe6df6f1ba.webp" alt="Loading" className="w-full h-full object-cover" />
              </div>
              <div>
                DARK<span className="text-red-500">BR387</span>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-y-0 left-0 w-1/2 bg-red-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
