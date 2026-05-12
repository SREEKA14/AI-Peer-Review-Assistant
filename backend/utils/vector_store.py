import chromadb

from sentence_transformers import SentenceTransformer

# ==========================================
# CREATE CHROMA CLIENT
# ==========================================

client = chromadb.PersistentClient(
    path="./database"
)

# ==========================================
# CREATE COLLECTION
# ==========================================

collection = client.get_or_create_collection(
    name="research_papers"
)

# ==========================================
# LOAD EMBEDDING MODEL
# ==========================================

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# ==========================================
# STORE CHUNKS
# ==========================================

def store_chunks(chunks):

    try:

        # Delete old data
        existing = collection.get()

        if existing["ids"]:

            collection.delete(
                ids=existing["ids"]
            )

        # Create embeddings
        embeddings = model.encode(
            chunks
        ).tolist()

        # Store in ChromaDB
        collection.add(
            documents=chunks,
            embeddings=embeddings,
            ids=[str(i) for i in range(len(chunks))]
        )

        print("Chunks stored successfully!")

    except Exception as e:

        print("VECTOR STORE ERROR:")
        print(e)

# ==========================================
# SEARCH SIMILAR
# ==========================================

def search_similar(query):

    query_embedding = model.encode(
        [query]
    ).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=3
    )

    return results