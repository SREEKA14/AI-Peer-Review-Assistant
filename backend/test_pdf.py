from utils.pdf_reader import extract_text_from_pdf
from utils.chunking import split_text
from utils.vector_store import store_chunks

from utils.review_engine import (
    generate_multi_agent_review
)

# Extract text
text = extract_text_from_pdf("sample.pdf")

# Split text
chunks = split_text(text)

# Store chunks
store_chunks(chunks)

print("\nGenerating Multi-Agent Review...\n")

review = generate_multi_agent_review()

print(review)