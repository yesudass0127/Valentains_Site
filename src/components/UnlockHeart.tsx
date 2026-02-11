import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Lock } from 'lucide-react';

interface UnlockHeartProps {
    onUnlock: () => void;
}

const UnlockHeart: React.FC<UnlockHeartProps> = ({ onUnlock }) => {
    // A selection of memory photos for the background mosaic
    const memoryPhotos = [
        "/Photos/1770658961313.jpg", "/Photos/1770658961333.jpg",
        "/Photos/1770658961337.jpg", "/Photos/1770658961341.jpg",
        "/Photos/1770658961347.jpg", "/Photos/1770658961362.jpg",
        "/Photos/1770658961366.jpg", "/Photos/1770658961371.jpg",
        "/Photos/1770658961387.jpg", "/Photos/1770658961395.jpg",
        "/Photos/1770658961402.jpg", "/Photos/1770658961407.jpg",
        "/Photos/1770658961410.jpg", "/Photos/1770658961413.jpg",
        "/Photos/1770658961418.jpg", "/Photos/1770658961421.jpg"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-rose-950"
        >
            {/* Memory Mosaic Background */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-2 opacity-40 grayscale-[0.5]">
                {memoryPhotos.concat(memoryPhotos).map((photo, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: Math.random() * 5
                        }}
                        className="aspect-square rounded-lg overflow-hidden"
                    >
                        <img
                            src={photo}
                            alt="Memory"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Dark Overlay for focus */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-rose-950/90 to-black/80 backdrop-blur-[2px]" />

            {/* Floating Bokeh Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.4, 0],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 md:w-4 md:h-4 bg-rose-400 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Main Interactive Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 max-w-lg w-full px-6"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group">
                    {/* Decorative inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 rounded-full text-rose-200 font-bold text-xs mb-8 uppercase tracking-widest"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>A Journey of Us</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-dancing text-white mb-6 leading-tight">
                        Welcome Home, <span className="text-rose-400">Bommi</span>
                    </h1>

                    <p className="text-rose-100/70 font-outfit text-lg mb-12 leading-relaxed italic">
                        "Every memory we share is a treasure hidden within.
                        Are you ready to unlock the magic of our story?"
                    </p>

                    {/* The Interactive Heart Button */}
                    <div className="relative inline-block group/heart">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                filter: ["drop-shadow(0 0 10px rgba(225,29,72,0.4))", "drop-shadow(0 0 30px rgba(225,29,72,0.8))", "drop-shadow(0 0 10px rgba(225,29,72,0.4))"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-gradient-to-br from-rose-500 to-rose-700 p-8 rounded-full cursor-pointer relative z-20 shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
                            onClick={onUnlock}
                        >
                            <Heart size={48} className="text-white fill-white group-hover/heart:fill-rose-100 transition-colors" />
                        </motion.div>

                        {/* Pulse rings outside the button */}
                        {[1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 border-2 border-rose-400/30 rounded-full pointer-events-none"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-rose-300/50 text-sm font-bold uppercase tracking-widest">
                        <Lock size={12} />
                        <span>Tap to Unlock the Memories</span>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 blur-3xl translate-y-1/2 -translate-x-1/2 rounded-full" />
                </div>
            </motion.div>

            {/* Floating Rose Petals (Subtle) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, x: Math.random() * 100 - 50, opacity: 0 }}
                        animate={{
                            y: [0, 800],
                            x: [Math.random() * 100 - 50, Math.random() * 200 - 100],
                            opacity: [0, 0.6, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                        className="absolute text-rose-400/20"
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        🌸
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default UnlockHeart;
