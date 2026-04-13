import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Sparkles } from "lucide-react";
import ChatMessage, { type Message } from "./ChatMessage";

interface ChatInterfaceProps {
  onBack: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "assistant",
  content: `## 🔮 Bem-vindo ao FutureMe AI\n\nEu sou seu **Oráculo de Linhas do Tempo**.\n\nQualquer decisão, por menor que seja, altera seu destino. O que você decidiu fazer (ou deixar de fazer) hoje?`,
};

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  
  const formatResponse = (data: any) => {
    const { negative_scenario: neg, positive_scenario: pos, estimativa_tempo } = data;
    
    return `## ⚡ Simulação de Linha do Tempo Concluída

### 📉 A Rota da Inércia
*Se você continuar exatamente como está:*

- **🗓️ 1 Mês:** ${neg["1_mes"]}
- **🗓️ 3 Meses:** ${neg["3_meses"]}
- **🗓️ 6 Meses:** ${neg["6_meses"]}
- **⚠️ Consequência:** ${neg["consequencias"]}

---

### 📈 A Rota do Potencial
*Se você agir com disciplina hoje:*

- **🚀 1 Mês:** ${pos["1_mes"]}
- **🚀 3 Meses:** ${pos["3_meses"]}
- **🚀 6 Meses:** ${pos["6_meses"]}
- **🏆 Ganhos:** ${pos["ganhos"]}

---

🔮 **VEREDITO DO ORÁCULO**
> Para que a **Rota do Potencial** se torne sua realidade definitiva, o sistema prevê um ciclo de maturação de: **${estimativa_tempo}**.

> *O futuro não está escrito em pedra, mas os seus padrões atuais sim. O que você vai fazer agora?*`;
  };

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      
      const response = await fetch("http://127.0.0.1:8000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_decision: userMessage }),
      });

      if (!response.ok) throw new Error("Erro na conexão com o Oráculo.");

      const data = await response.json();
      
      
      const botContent = formatResponse(data);

      const botMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: botContent,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("simulateResponse error:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `❌ Erro: ${errMsg}`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input.trim();
    setInput("");
    simulateResponse(currentInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen relative z-10 bg-background">
      {}
      <header className="glass-surface border-b border-border/50 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-glow-primary" />
          <div>
            <h2 className="font-display text-sm font-bold tracking-wider">FUTUREME AI</h2>
            <p className="text-xs text-glow-accent font-mono">conexão neural ativa</p>
          </div>
        </div>
      </header>

      {}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-glow-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-glow-primary" />
            </div>
            <div className="glass-surface rounded-lg px-4 py-3 text-sm text-muted-foreground">
              Simulando realidades alternativas...
            </div>
          </div>
        )}
      </div>

      {}
      <footer className="glass-surface border-t border-border/50 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: Vou treinar musculação 4x por semana e dormir 7h por noite..."
            rows={1}
            className="flex-1 resize-none bg-muted/30 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-glow-primary/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 rounded-lg bg-primary text-primary-foreground disabled:opacity-30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;