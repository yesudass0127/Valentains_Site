import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, SkipForward, SkipBack, Heart } from 'lucide-react';

interface Song {
    title: string;
    artist: string;
    url: string;
}

interface MusicPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const songs: Song[] = [
        {
            title: "Unakkenna Venum Sollu",
            artist: "Harris Jayaraj",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder
        },
        {
            title: "Kadhale Kadhale",
            artist: "Govind Vasantha",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Placeholder
        },
        {
            title: "Munbe Vaa",
            artist: "A.R. Rahman",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Placeholder
        }
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        onToggle();
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.error("Audio play failed:", err);
                    setError("Playback blocked. Please interact with the music player.");
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        setError(null);
        if (!isPlaying) onToggle();
    };

    const handlePrev = () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setError(null);
        if (!isPlaying) onToggle();
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(err => console.log("Audio play failed on change:", err));
        }
    }, [currentSongIndex]);

    return (
        <div className="fixed bottom-24 right-8 z-[150] pointer-events-none">
            <audio
                ref={audioRef}
                src={songs[currentSongIndex].url}
                onEnded={handleNext}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => {
                    setIsLoading(false);
                    setError(null);
                }}
                onError={(e) => {
                    console.error("Audio Load Error:", e);
                    setIsLoading(false);
                    setError("Music source unavailable. Try another song?");
                }}
                loop={false}
            />

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl flex items-center gap-4 min-w-[280px]"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white shadow-lg"
                            >
                                <Music size={20} />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1 text-rose-400"
                            >
                                <Heart size={14} fill="currentColor" />
                            </motion.div>
                        </div>

                        <div className="flex-grow overflow-hidden">
                            <h4 className="text-white font-bold text-sm truncate uppercase tracking-wider">
                                {isLoading ? "Loading..." : songs[currentSongIndex].title}
                            </h4>
                            <p className="text-rose-200/70 text-xs truncate">
                                {error || songs[currentSongIndex].artist}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-center gap-1 group/vol">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-500 opacity-0 group-hover/vol:opacity-100 transition-opacity"
                                />
                                <button onClick={togglePlay} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                                    {isPlaying ? <Volume2 size={16} fill="currentColor" /> : <VolumeX size={16} />}
                                </button>
                            </div>
                            <button onClick={handlePrev} className="text-white/60 hover:text-white transition-colors">
                                <SkipBack size={18} fill="currentColor" />
                            </button>
                            <button onClick={handleNext} className="text-white/60 hover:text-white transition-colors">
                                <SkipForward size={18} fill="currentColor" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;
