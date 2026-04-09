# 🔮 FutureMe AI - Simulador de Realidade Alternativa

O **FutureMe AI** é um oráculo digital que utiliza Inteligência Artificial (GPT-3.5) para projetar o futuro do usuário com base em suas decisões e hábitos atuais. O projeto simula "Linhas do Tempo" alternativas, mostrando as consequências da inércia versus o potencial da disciplina.

---

## O Conceito
Diferente de um chatbot comum, o FutureMe atua como um **Simulador de Consequências**. Ele analisa o comportamento humano real (procrastinação, consistência, esforço) para gerar cenários realistas de 1, 3 e 6 meses.

## Tech Stack

**Backend:**
- **Python 3.14+**
- **FastAPI:** API de alta performance.
- **SQLAlchemy:** ORM para persistência de dados.
- **SQLite:** Banco de dados relacional para memória de longo prazo.
- **LangChain:** Orquestração de prompts e memória de contexto.

**Frontend:**
- **React + TypeScript**
- **Tailwind CSS:** Estilização moderna e responsiva.
- **Framer Motion:** Animações de interface.
- **Lucide React:** Iconografia.

---

## Funcionalidades
- [x] **Simulação Dual:** Gera cenários positivo e negativo simultaneamente.
- [x] **Memória de Longo Prazo:** O bot recorda decisões passadas para cobrar consistência.
- [x] **Modo Oráculo:** Respostas personalizadas e diretas (fala "Você" em vez de "O usuário").
- [x] **Interface Cyberpunk:** Design dark mode com efeitos de brilho e transparência (Glassmorphism).

---

## Como Rodar o Projeto

### Preparar o Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
# Crie um arquivo .env com sua OPENAI_API_KEY
uvicorn app.main:app --reload

### Preparar o Frontend

cd frontend
npm install
npm run dev