import os

from dotenv import load_dotenv
from groq import Groq

from utils.vector_store import search_similar

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

#Agents
from utils.agents import (
    methodology_agent,
    citation_agent,
    novelty_agent
)

# ==========================================
# QUESTION ANSWERING FUNCTION
# ==========================================

def answer_question(question):

    # Retrieve relevant chunks
    results = search_similar(question)

    retrieved_chunks = results['documents'][0]

    # Combine chunks into context
    context = "\n".join(retrieved_chunks)

    # Prompt
    prompt = f"""
You are an AI Research Paper Assistant.

Answer the question using ONLY the provided research paper context.

Provide:
- Detailed answer
- Clear explanation
- Complete context

If answer is unavailable, say:
'Answer not found in the paper.'

Research Paper Context:
{context}

Question:
{question}

Answer:
"""

    # Generate response
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=500
    )

    return response.choices[0].message.content


# ==========================================
# AI REVIEW GENERATION FUNCTION
# ==========================================

def generate_review():

    # Retrieve methodology-related chunks
    query = "methodology and research analysis"

    results = search_similar(query)

    retrieved_chunks = results['documents'][0]

    context = "\n".join(retrieved_chunks)

    # Review prompt
    prompt = f"""
You are an expert AI Research Paper Reviewer.

Analyze this research paper and provide:

1. Research Summary
2. Strengths
3. Weaknesses
4. Methodology Issues
5. Missing Information
6. Improvement Suggestions
7. Final Review Score out of 10

Provide detailed academic analysis.

Research Paper Context:
{context}

Review:
"""

    # Generate review
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=1500
    )

    return response.choices[0].message.content

#Multi agents Function
def generate_multi_agent_review():

    query = "research methodology analysis"

    results = search_similar(query)

    retrieved_chunks = results['documents'][0]

    context = "\n".join(retrieved_chunks)

    # Run agents
    methodology_review = methodology_agent(context)

    citation_review = citation_agent(context)

    novelty_review = novelty_agent(context)

    # Combine outputs
    final_review = f"""
==================================================
METHODOLOGY REVIEW
==================================================

{methodology_review}


==================================================
CITATION REVIEW
==================================================

{citation_review}


==================================================
NOVELTY REVIEW
==================================================

{novelty_review}
"""

    return final_review