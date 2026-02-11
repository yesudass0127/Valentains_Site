import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Heart } from 'lucide-react';

interface SecretValidationProps {
    onSuccess: () => void;
}

const SecretValidation: React.FC<SecretValidationProps> = ({ onSuccess }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const secrets = ['pattu', 'baby'];

    const memoryPhotos = [
        "/Photos/1770658961313.jpg", "/Photos/1770658961333.jpg",
        "/Photos/1770658961337.jpg", "/Photos/1770658961341.jpg",
        "/Photos/1770658961347.jpg", "/Photos/1770658961362.jpg",
        "/Photos/1770658961366.jpg", "/Photos/1770658961371.jpg",
        "/Photos/1770658961387.jpg", "/Photos/1770658961395.jpg"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (secrets.includes(inputValue.toLowerCase().trim())) {
            setShowSuccess(true);
            setTimeout(onSuccess, 2000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-950 p-6 relative overflow-hidden">
            {/* Memory Mosaic Background (Dimmed) */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 p-2 opacity-20 grayscale">
                {memoryPhotos.map((photo, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 2, delay: i * 0.1 }}
                        className="aspect-square rounded-lg overflow-hidden"
                    >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/90 via-rose-900/80 to-black/90 backdrop-blur-[1px]" />

            <AnimatePresence mode="wait">
                {!showSuccess ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        className="max-w-md w-full relative z-10"
                    >
                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />

                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="inline-block text-6xl mb-8 filter drop-shadow(0 0 15px rgba(225,29,72,0.3))"
                            >
                                🤫
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 rounded-full text-rose-300 font-bold text-[10px] mb-6 uppercase tracking-[0.2em]"
                            >
                                <Lock size={12} />
                                <span>Identity Verification</span>
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-dancing text-white mb-6">Our Secret Name</h2>

                            <p className="font-outfit text-rose-100/70 mb-10 leading-relaxed italic">
                                "Only my favorite person knows the name that unlocks the beauty within. What do I love to call you?"
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6 relative">
                                <div className="relative">
                                    <motion.input
                                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Secret word..."
                                        className={`w-full px-8 py-5 rounded-3xl border-2 text-center font-outfit text-xl transition-all outline-none bg-white/5 backdrop-blur-md text-white placeholder-rose-200/30 ${error ? 'border-red-400 bg-red-400/10' : 'border-white/10 focus:border-rose-400/50'
                                            }`}
                                    />
                                    <Heart
                                        size={20}
                                        className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors ${inputValue ? 'text-rose-400 fill-rose-400' : 'text-white/20'}`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group w-full py-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-3xl font-bold text-lg shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:shadow-[0_15px_40px_rgba(225,29,72,0.6)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <span>Proceed with Love</span>
                                    <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
                                </button>
                            </form>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 text-rose-400 font-outfit text-sm font-medium"
                                >
                                    Hint: It starts with 'P' or 'B'... and it's our favorite!
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center z-10"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 15, -15, 15, 0],
                                scale: [1, 1.3, 1]
                            }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="text-9xl mb-8 filter drop-shadow(0 0 30px rgba(225,29,72,0.6))"
                        >
                            💖
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-dancing text-white mb-4">That's my Pattu!</h2>
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-2xl font-outfit text-rose-300"
                        >
                            Opening our universe of memories...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SecretValidation;
