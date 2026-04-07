import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [view, setView] = useState<"hero" | "chat">("hero");

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleField />
      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection onStartChat={() => setView("chat")} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-screen"
          >
            <ChatInterface onBack={() => setView("hero")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
