from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil

from utils.pdf_reader import extract_text_from_pdf
from utils.vector_store import store_chunks
from utils.chunking import split_text

from utils.review_engine import (
    answer_question,
    generate_review,
    generate_multi_agent_review
)

# ==========================================
# INITIALIZE FASTAPI
# ==========================================

app = FastAPI()


# ==========================================
# ENABLE CORS
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():

    return {
        "message": "AI Peer Review Assistant Running Successfully"
    }


# ==========================================
# PDF UPLOAD ROUTE
# ==========================================

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    print("STEP 1: Upload started")

    # Save uploaded PDF
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("STEP 2: File saved")

    # Extract text
    text = extract_text_from_pdf(file_path)

    print("STEP 3: Text extracted")

    # Split into chunks
    chunks = split_text(text)

    print("STEP 4: Chunks created")

    print("TOTAL CHUNKS:", len(chunks))

    # Store embeddings
    store_chunks(chunks)

    print("STEP 5: Chunks stored")

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "total_chunks": len(chunks)
    }

# ==========================================
# QUESTION ANSWERING ROUTE
# ==========================================

@app.get("/ask")
def ask(question: str):

    answer = answer_question(question)

    return {
        "question": question,
        "answer": answer
    }


# ==========================================
# SINGLE AI REVIEW ROUTE
# ==========================================

@app.get("/review")
def review():

    review_result = generate_review()

    return {
        "review": review_result
    }


# ==========================================
# MULTI-AGENT REVIEW ROUTE
# ==========================================

@app.get("/multi-review")
def multi_review():

    review_result = generate_multi_agent_review()

    return {
        "multi_agent_review": review_result
    }