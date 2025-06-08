import { motion } from 'framer-motion';

export const WelcomeAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[500px] overflow-hidden rounded-xl"
    >
      <motion.video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <source src="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a44ffad96bf9d4e8f29b4c50b255a7c0f&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
      </motion.video>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent flex items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="p-12">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Bienvenido a Fuerza Salvaje
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Donde cada animal encuentra un hogar lleno de amor
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};