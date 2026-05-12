# 🤖 AI Peer Review Assistant

An AI-powered Research Paper Review System built using **FastAPI, React, LangChain, ChromaDB, Hugging Face Embeddings, and Generative AI**.  

This project helps users upload research papers and receive:
- AI-generated summaries
- Research paper question answering
- Automated peer review analysis
- Multi-agent evaluation of methodology, citations, and novelty

The system uses a **Retrieval-Augmented Generation (RAG)** pipeline to understand uploaded research papers and generate intelligent responses in real time.

---

# 🚀 Features

## 📄 Research Paper Upload
- Upload research papers in PDF format
- Extracts text automatically
- Splits content into semantic chunks

---

## 🧠 AI Question Answering
Ask questions related to the uploaded paper such as:
- What technologies are used?
- What is the objective of the paper?
- What methodology is followed?
- What are the limitations?

The system retrieves relevant chunks from the paper and generates contextual answers using LLMs.

---

## 🔍 AI Peer Review Generation
Automatically generates:
- Research summary
- Strengths
- Weaknesses
- Methodology issues
- Missing information
- Improvement suggestions
- Review score

---

## 🤝 Multi-Agent AI Review
Implements multiple AI review agents for:
- Methodology Analysis
- Citation Evaluation
- Novelty Detection
- Research Quality Assessment

Each agent independently analyzes the research paper to simulate a peer-review workflow.

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

---

## Backend
- FastAPI
- Python

---

## AI / NLP / RAG
- LangChain
- ChromaDB
- Sentence Transformers
- Hugging Face Embeddings
- Groq API (Llama 3)
- Retrieval-Augmented Generation (RAG)

---

# ⚙️ System Workflow

1. User uploads a research paper
2. PDF text is extracted
3. Text is divided into chunks
4. Embeddings are generated
5. Chunks are stored in ChromaDB
6. User asks questions
7. Relevant chunks are retrieved
8. LLM generates intelligent responses
9. AI review agents analyze the paper

---

# 📂 Project Structure

```bash
AI-Peer-Review-Assistant/
│
├── backend/
│   ├── utils/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── package.json
│
└── README.md

# ▶️ How to Run the Project

## 📌 Clone the Repository

```bash
git clone https://github.com/SREEKA14/AI-Peer-Review-Assistant.git
```

---

# ⚙️ Backend Setup

## Step 1 — Navigate to Backend

```bash
cd AI-Peer-Review-Assistant/backend
```

---

## Step 2 — Create Virtual Environment

```bash
python -m venv venv
```

---

## Step 3 — Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## Step 4 — Install Requirements

```bash
pip install -r requirements.txt
```

---

## Step 5 — Create `.env` File

Create a `.env` file inside the backend folder and add:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Step 6 — Run Backend Server

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on:

```text
http://localhost:8000
```

---

# 🎨 Frontend Setup

## Step 1 — Navigate to Frontend

Open new terminal:

```bash
cd AI-Peer-Review-Assistant/frontend
```

---

## Step 2 — Install Node Modules

```bash
npm install
```

---

## Step 3 — Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🚀 Usage

1. Upload a research paper PDF
2. Wait for AI processing
3. Ask questions related to the paper
4. Generate AI Review
5. Generate Multi-Agent Review

