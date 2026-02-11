import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

interface VideoSpotlightProps {
    onComplete?: () => void;
}

const VideoSpotlight: React.FC<VideoSpotlightProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
            if (currentProgress >= 100 && onComplete) {
                onComplete();
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isPlaying, showControls]);

    return (
        <section className="min-h-screen bg-rose-50/20 py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 2,
                        }}
                        className="absolute bg-rose-200/30 blur-3xl rounded-full"
                        style={{
                            width: `${200 + i * 50}px`,
                            height: `${200 + i * 50}px`,
                            left: `${(i * 20) % 100}%`,
                            top: `${(i * 15) % 100}%`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl w-full z-10"
            >
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full text-valentine-red font-bold text-sm mb-4"
                    >
                        <Sparkles size={16} />
                        <span>Featured Memory</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-dancing text-valentine-red mb-4">
                        A Gift of Love from You
                    </h2>
                    <p className="text-gray-600 font-outfit text-lg max-w-2xl mx-auto italic">
                        "Every frame of this video holds a story, and every story reminds me of why I'm so lucky to have you. This is my absolute favorite."
                    </p>
                </div>

                {/* Video Player Container */}
                <div
                    className="relative group aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(251,113,133,0.3)] border-4 border-white bg-black cursor-pointer"
                    onMouseMove={() => setShowControls(true)}
                    onClick={togglePlay}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        onTimeUpdate={handleProgress}
                        playsInline
                        src="/Videos/4541993848df49dbb2b5957e5c4c59b0.mp4"
                    />

                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Big Play Button Overlay */}
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="p-8 bg-white/20 backdrop-blur-md rounded-full border border-white/50 text-white shadow-2xl">
                                    <Play size={48} fill="currentColor" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Controls Bar */}
                    <motion.div
                        initial={false}
                        animate={{ y: showControls || !isPlaying ? 0 : 100 }}
                        className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative group/progress cursor-pointer">
                            <motion.div
                                className="h-full bg-valentine-red relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
                            </motion.div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button onClick={togglePlay} className="text-white hover:text-rose-200 transition-colors">
                                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                                </button>

                                <button onClick={toggleMute} className="text-white hover:text-rose-200 transition-colors">
                                    {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                                </button>
                            </div>

                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-rose-400"
                            >
                                <Heart size={32} fill="currentColor" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Floating Hearts Animation when Playing */}
                    <AnimatePresence>
                        {isPlaying && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 100, x: Math.random() * 1000 - 500 }}
                                        animate={{
                                            opacity: [0, 0.6, 0],
                                            y: -500,
                                            rotate: Math.random() * 360
                                        }}
                                        transition={{
                                            duration: 3 + Math.random() * 4,
                                            repeat: Infinity,
                                            delay: Math.random() * 5
                                        }}
                                        className="absolute bottom-0 left-1/2 text-rose-300"
                                    >
                                        <Heart size={20 + Math.random() * 30} fill="currentColor" opacity={0.4} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Video Subtitle/Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg">
                        <p className="font-playfair text-2xl text-rose-500 font-bold mb-2">
                            Special Highlight
                        </p>
                        <p className="text-gray-700 font-outfit max-w-lg">
                            This video is a masterpiece because it was made with love, specifically for me.
                            It remains the highlight of my collection. Thank you for this beautiful memory.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default VideoSpotlight;
