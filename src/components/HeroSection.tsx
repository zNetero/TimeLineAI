import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 gradient-solo" />
      </div>

      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-[2px] bg-glow-primary/10"
          style={{ animation: "scan-line 4s linear infinite" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow glass-surface mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-glow-accent animate-pulse-glow" />
          <span className="font-mono text-sm text-glow-accent tracking-wider">SISTEMA ONLINE</span>
        </motion.div>

        {}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
        >
          <span className="text-foreground">FUTURE</span>
          <span className="text-glow-primary">ME</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-display text-lg md:text-xl tracking-[0.3em] text-muted-foreground mb-8"
        >
          SIMULADOR DE REALIDADE ALTERNATIVA
        </motion.div>

        {}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Descubra o futuro que suas decisões estão criando.
          <br />
          <span className="text-foreground font-semibold">Simule linhas do tempo. Mude seu destino.</span>
        </motion.p>

        {}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartChat}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary font-display font-bold text-primary-foreground text-lg tracking-wider glow-primary transition-all hover:shadow-[0_0_40px_hsl(var(--glow-primary)/0.5)]"
        >
          <Zap className="w-5 h-5" />
          INICIAR SIMULAÇÃO
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: "🔮", title: "Simulador de Vida", desc: "Preveja cenários baseados em suas escolhas" },
            { icon: "📊", title: "Previsor de Consequências", desc: "Veja o impacto de cada decisão no tempo" },
            { icon: "🧩", title: "Motor de Decisões", desc: "Linhas do tempo alternativas para seu futuro" },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-surface rounded-lg p-6 border-glow hover:glow-primary transition-all duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display text-sm font-bold tracking-wider text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
