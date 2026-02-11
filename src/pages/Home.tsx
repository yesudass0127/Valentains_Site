import { useState } from 'react';
import ValentineHero from '../components/ValentineHero';
import LoveLetter from '../components/LoveLetter';
// FloatingHearts removed as it was replaced by FallingMemories
import GiftSection from '../components/GiftSection';
import UnlockHeart from '../components/UnlockHeart';
import MemoryBubbles from '../components/MemoryBubbles';
import TreasureBox from '../components/TreasureBox';
import SecretValidation from '../components/SecretValidation';
import LoveMilestones from '../components/LoveMilestones';
import ProposalGame from '../components/ProposalGame';
import { AnimatePresence, motion } from 'framer-motion';

import PolaroidScrapbook from '../components/PolaroidScrapbook';
import PhotoCarousel3D from '../components/PhotoCarousel3D';
import HeartScanner from '../components/HeartScanner';
import MemoryConstellation from '../components/MemoryConstellation';
import LoveContract from '../components/LoveContract';
import HiddenPromise from '../components/HiddenPromise';
import FallingMemories from '../components/FallingMemories';
import SecretScratchCard from '../components/SecretScratchCard';
import LoveQuiz from '../components/LoveQuiz';
import CursorTrail from '../components/CursorTrail';
import FloatingLoveNotes from '../components/FloatingLoveNotes';
import RosePetals from '../components/RosePetals';
import HandInHandHighlight from '../components/HandInHandHighlight';
import InteractionHub from '../components/InteractionHub';
import MagicGarden from '../components/MagicGarden';
import ForeverCounter from '../components/ForeverCounter';
import LoveMap from '../components/LoveMap';
import MoodHarmony from '../components/MoodHarmony';
import WishingWell from '../components/WishingWell';
import VideoSpotlight from '../components/VideoSpotlight';
import MusicPlayer from '../components/MusicPlayer';


type JourneyStep = 'UNLOCK' | 'SECRET' | 'MILESTONES' | 'PROPOSAL' | 'MEMORIES' | 'TREASURE' | 'FINAL';
type StoryScene = 'GARDEN' | 'HERO' | 'MOOD' | 'COUNTER' | 'QUIZ' | 'MAP' | 'SCANNER' | 'HIGHLIGHT' | 'VIDEO' | 'SCRAPBOOK' | 'CAROUSEL' | 'MESSAGES' | 'WISH' | 'CONSTELLATION' | 'CONTRACT' | 'PROMISE' | 'SCRATCH' | 'LETTER';

const Home = () => {
    const [step, setStep] = useState<JourneyStep>('UNLOCK');
    const [scene, setScene] = useState<StoryScene>('GARDEN');
    const [completedScenes, setCompletedScenes] = useState<StoryScene[]>([]);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    const scenes: StoryScene[] = ['GARDEN', 'HERO', 'MOOD', 'COUNTER', 'QUIZ', 'MAP', 'SCANNER', 'HIGHLIGHT', 'VIDEO', 'SCRAPBOOK', 'CAROUSEL', 'MESSAGES', 'WISH', 'CONSTELLATION', 'CONTRACT', 'PROMISE', 'SCRATCH', 'LETTER'];

    const markSceneComplete = (s: StoryScene) => {
        if (!completedScenes.includes(s)) {
            setCompletedScenes(prev => [...prev, s]);
        }
    };

    const isSceneLocked = (s: StoryScene) => {
        const interactiveScenes: StoryScene[] = ['QUIZ', 'SCANNER', 'CAROUSEL', 'CONSTELLATION', 'CONTRACT', 'PROMISE', 'SCRATCH'];
        return interactiveScenes.includes(s) && !completedScenes.includes(s);
    };

    const nextScene = () => {
        if (isSceneLocked(scene)) return;
        const currentIndex = scenes.indexOf(scene);
        if (currentIndex < scenes.length - 1) {
            setScene(scenes[currentIndex + 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevScene = () => {
        const currentIndex = scenes.indexOf(scene);
        if (currentIndex > 0) {
            setScene(scenes[currentIndex - 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <div className="flex flex-col w-full relative min-h-screen overflow-x-hidden bg-rose-50/10">
            <CursorTrail />
            <AnimatePresence mode="wait">
                {/* ... (keep existing steps) ... */}
                {step === 'UNLOCK' && (
                    <UnlockHeart key="unlock" onUnlock={() => {
                        setStep('SECRET');
                        setIsMusicPlaying(true);
                    }} />
                )}

                {step === 'SECRET' && (
                    <SecretValidation key="secret" onSuccess={() => setStep('MILESTONES')} />
                )}

                {step === 'MILESTONES' && (
                    <LoveMilestones key="milestones" onComplete={() => setStep('PROPOSAL')} />
                )}

                {step === 'PROPOSAL' && (
                    <ProposalGame key="proposal" onAccept={() => setStep('MEMORIES')} />
                )}



                {step === 'MEMORIES' && (
                    <motion.div
                        key="memories"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MemoryBubbles onComplete={() => setStep('TREASURE')} />
                    </motion.div>
                )}

                {step === 'TREASURE' && (
                    <TreasureBox key="treasure" onOpen={() => setStep('FINAL')} />
                )}

                {step === 'FINAL' && (
                    <motion.div
                        key="final"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full relative min-h-screen flex flex-col"
                    >
                        <RosePetals />
                        <FallingMemories />

                        {/* Immersive Scene Orchestrator */}
                        <div className="flex-grow flex flex-col relative">
                            <AnimatePresence mode="wait">
                                {scene === 'GARDEN' && <motion.div key="garden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }}><MagicGarden /></motion.div>}
                                {scene === 'HERO' && <motion.div key="hero" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.6 }}><ValentineHero /></motion.div>}
                                {scene === 'MOOD' && <motion.div key="mood" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MoodHarmony /></motion.div>}
                                {scene === 'COUNTER' && <motion.div key="counter" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.8 }}><ForeverCounter /></motion.div>}
                                {scene === 'QUIZ' && <motion.div key="quiz" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.6 }}><LoveQuiz onComplete={() => markSceneComplete('QUIZ')} /></motion.div>}
                                {scene === 'MAP' && <motion.div key="map" initial={{ opacity: 0, rotate: 20 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -20 }} transition={{ duration: 0.7 }}><LoveMap /></motion.div>}
                                {scene === 'SCANNER' && <motion.div key="scanner" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.6 }}><HeartScanner onComplete={() => markSceneComplete('SCANNER')} /></motion.div>}
                                {scene === 'HIGHLIGHT' && <motion.div key="highlight" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.8 }}><HandInHandHighlight /></motion.div>}
                                {scene === 'VIDEO' && <motion.div key="video" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }}><VideoSpotlight /></motion.div>}
                                {scene === 'SCRAPBOOK' && <motion.div key="scrapbook" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }} transition={{ duration: 0.7 }}><PolaroidScrapbook /></motion.div>}
                                {scene === 'CAROUSEL' && <motion.div key="carousel" initial={{ opacity: 0, z: -500 }} animate={{ opacity: 1, z: 0 }} exit={{ opacity: 0, z: 500 }} transition={{ duration: 0.8 }}><PhotoCarousel3D onComplete={() => markSceneComplete('CAROUSEL')} /></motion.div>}
                                {scene === 'MESSAGES' && <motion.div key="messages" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.6 }}><FloatingLoveNotes /></motion.div>}
                                {scene === 'WISH' && <motion.div key="wish" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 2 }} transition={{ duration: 0.8 }}><WishingWell /></motion.div>}
                                {scene === 'CONSTELLATION' && <motion.div key="constellation" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.8 }}><MemoryConstellation onComplete={() => markSceneComplete('CONSTELLATION')} /></motion.div>}
                                {scene === 'CONTRACT' && <motion.div key="contract" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.7 }}><LoveContract onComplete={() => markSceneComplete('CONTRACT')} /></motion.div>}
                                {scene === 'PROMISE' && <motion.div key="promise" initial={{ opacity: 0, scale: 0.8, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.2, rotate: 10 }} transition={{ duration: 0.6 }}><HiddenPromise onComplete={() => markSceneComplete('PROMISE')} /></motion.div>}
                                {scene === 'SCRATCH' && <motion.div key="scratch" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.6 }}><SecretScratchCard onComplete={() => markSceneComplete('SCRATCH')} /></motion.div>}
                                {scene === 'LETTER' && <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}><LoveLetter /><GiftSection /></motion.div>}
                            </AnimatePresence>

                            {/* Scene Navigation Controllers */}
                            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/50 shadow-xl z-[110]">
                                <button
                                    onClick={prevScene}
                                    disabled={scene === 'GARDEN'}
                                    className={`text-valentine-red font-bold transition-all ${scene === 'GARDEN' ? 'opacity-20' : 'hover:scale-110'}`}
                                >
                                    ← Back
                                </button>
                                <div className="flex gap-2">
                                    {scenes.map((s, i) => (
                                        <div
                                            key={i}
                                            className={`w-2 h-2 rounded-full transition-all duration-500 ${scene === s ? 'bg-valentine-red w-6' : 'bg-rose-200'}`}
                                        />
                                    ))}
                                </div>


                                <button
                                    onClick={nextScene}
                                    disabled={scene === 'LETTER' || isSceneLocked(scene)}
                                    className={`text-valentine-red font-bold transition-all ${(scene === 'LETTER' || isSceneLocked(scene)) ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110'
                                        }`}
                                >
                                    {scene === 'GARDEN' ? 'Start Story' : 'Continue'} →
                                </button>
                            </div>
                        </div>

                        {/* Interactive App Hub */}
                        <InteractionHub isMusicPlaying={isMusicPlaying} onToggleMusic={() => setIsMusicPlaying(!isMusicPlaying)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <MusicPlayer isPlaying={isMusicPlaying} onToggle={() => setIsMusicPlaying(!isMusicPlaying)} />
        </div>
    );
};

export default Home;
