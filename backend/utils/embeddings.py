from sentence_transformers import SentenceTransformer

# Better embedding model
model = SentenceTransformer(
    "BAAI/bge-base-en-v1.5"
)


def create_embeddings(chunks):

    embeddings = model.encode(
        chunks,
        normalize_embeddings=True
    )

    return embeddings