# RAG-Chatbot

RAG-Chatbot (Retrieval-Augmented Generation Chatbot) is a terminal-based chatbot that answers questions based on the content of a provided PDF document. It uses Pinecone for vector storage, Cohere for embeddings, and Groq for generating responses. The chatbot performs similarity searches on the document to retrieve relevant information and provides context-aware answers.

## Features

- **PDF Document Parsing**: Extracts text from PDF files.
- **Text Chunking**: Splits large text into manageable chunks for efficient processing.
- **Embeddings**: Uses Cohere embeddings to represent text as vectors.
- **Vector Search**: Performs similarity searches using Pinecone to find relevant document sections.
- **Contextual Chat**: Generates answers based on the retrieved document context using Groq's language model.
- **Interactive Terminal Interface**: Chat with the bot in real-time via the terminal.

## Prerequisites

- **Bun**: Ensure you have [Bun](https://bun.sh) installed.
- **Environment Variables**: Set up the following in a `.env` file:
  ```env
  COHERE_API_KEY=<your-cohere-api-key>
  PINECONE_API_KEY=<your-pinecone-api-key>
  PINECONE_INDEX=<your-pinecone-index-name>
  GROQ_API_KEY=<your-groq-api-key>
  ```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd RAG-bot
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Add your PDF document to the project directory (e.g., `company_policy_guidelines.pdf`).

## Usage

1. Index the document:

   ```bash
   bun run index.ts
   ```

2. Start the chatbot:

   ```bash
   bun run chat.ts
   ```

3. Interact with the chatbot in the terminal:
   - Ask questions based on the document.
   - Type `/bye` to exit the chat.

## Project Structure

- **`index.ts`**: Entry point for indexing the document.
- **`chat.ts`**: Main chatbot logic for interactive Q&A.
- **`pdfLoder.ts`**: Handles PDF loading, text splitting, and vector storage.
- **`.env`**: Stores API keys and environment variables.

## Technologies Used

- **[Bun](https://bun.sh)**: A fast JavaScript runtime.
- **[Cohere](https://cohere.ai)**: For generating text embeddings.
- **[Pinecone](https://www.pinecone.io)**: For vector similarity search.
- **[Groq](https://groq.com)**: For generating conversational responses.
- **[LangChain](https://langchain.com)**: For document loaders and text splitters.

## Example Interaction

```plaintext
you: What is the company's policy on remote work?
Assistant: The company's policy on remote work is as follows: ...
```

## Notes

- If the chatbot cannot find an answer in the document, it will respond with "I do not know."
- Ensure your Pinecone index is properly set up and populated before starting the chatbot.

## License

This project is private and not licensed for distribution. Contact the author for permissions.
