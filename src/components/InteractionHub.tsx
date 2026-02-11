import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveAction {
    icon: string;
    label: string;
    action: () => void;
}

interface InteractionHubProps {
    isMusicPlaying: boolean;
    onToggleMusic: () => void;
}

const InteractionHub: React.FC<InteractionHubProps> = ({ isMusicPlaying, onToggleMusic }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    const actions: LoveAction[] = [
        {
            icon: isMusicPlaying ? "🎵" : "🔇",
            label: isMusicPlaying ? "Pause Music" : "Play Music",
            action: onToggleMusic
        },
        {
            icon: "💖",
            label: "Get a Compliment",
            action: () => {
                const compliments = [
                    "You're the most beautiful person I know, Bommi.",
                    "Your kindness inspires me every day.",
                    "I love how your eyes sparkle when you laugh.",
                    "You make the world better just by being in it.",
                    "You're my favorite thought, Pattu."
                ];
                setActiveMessage(compliments[Math.floor(Math.random() * compliments.length)]);
            }
        },
        {
            icon: "🫂",
            label: "Virtual Hug",
            action: () => setActiveMessage("Sending a big, warm squeeze to my favorite person! 🤗")
        },
        {
            icon: "🎆",
            label: "Update Atmosphere",
            action: () => setActiveMessage("Atmosphere updated! I've sprinkled extra love sparkles just for you. ✨")
        }
    ];


    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {activeMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="absolute bottom-24 right-0 w-64 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-2 border-rose-100 text-center font-dancing text-xl text-valentine-red"
                    >
                        {activeMessage}
                        <button
                            onClick={() => setActiveMessage(null)}
                            className="mt-4 text-sm font-outfit text-rose-300 hover:text-rose-500 uppercase tracking-widest"
                        >
                            Close
                        </button>
                    </motion.div>
                )}

                {isOpen && (
                    <div className="absolute bottom-20 right-0 flex flex-col gap-4">
                        {actions.map((item, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20, x: 20 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, y: 20, x: 20 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                    item.action();
                                    setIsOpen(false);
                                }}
                                className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg border border-rose-50 hover:bg-rose-50 transition-all"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className="hidden group-hover:block font-outfit text-rose-400 whitespace-nowrap pr-2">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 ${isOpen ? 'bg-valentine-red text-white rotate-45' : 'bg-white text-valentine-red'}`}
            >
                {isOpen ? "✕" : "❤️"}
            </motion.button>
        </div>
    );
};

export default InteractionHub;
