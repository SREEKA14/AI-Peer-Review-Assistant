from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

# ==========================================
# SPLIT TEXT INTO CHUNKS
# ==========================================

def split_text(text):

    # Create text splitter
    text_splitter = RecursiveCharacterTextSplitter(

        chunk_size=500,

        chunk_overlap=100

    )

    # Split text
    chunks = text_splitter.split_text(text)

    # Limit chunks for faster processing
    chunks = chunks[:30]

    return chunks