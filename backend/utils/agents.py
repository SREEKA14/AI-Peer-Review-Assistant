import os

from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# ==========================================
# METHODOLOGY REVIEW AGENT
# ==========================================

def methodology_agent(context):

    prompt = f"""
You are a Research Methodology Expert.

Analyze:
- methodology quality
- dataset issues
- evaluation metrics
- experiment design
- research validity

Research Paper Context:
{context}

Methodology Review:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=600
    )

    return response.choices[0].message.content


# ==========================================
# CITATION REVIEW AGENT
# ==========================================

def citation_agent(context):

    prompt = f"""
You are a Citation and Literature Review Expert.

Analyze:
- citation quality
- missing references
- literature survey quality
- academic credibility

Research Paper Context:
{context}

Citation Review:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=600
    )

    return response.choices[0].message.content


# ==========================================
# NOVELTY REVIEW AGENT
# ==========================================

def novelty_agent(context):

    prompt = f"""
You are an AI Research Innovation Reviewer.

Analyze:
- novelty
- innovation
- originality
- uniqueness of contribution

Research Paper Context:
{context}

Novelty Review:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=600
    )

    return response.choices[0].message.content