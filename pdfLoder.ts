import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

// const companyPolicyPath = "./company_policy_guidelines.pdf";

const embeddings = new CohereEmbeddings({
  model: "embed-english-v3.0",
});

const pinecone = new PineconeClient();
if (!process.env.PINECONE_INDEX) {
  throw new Error("PINECONE_INDEX environment variable is not defined.");
}
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export async function indexDocument(file: any) {
  const loader = new PDFLoader(file, { splitPages: false });

  const doc = await loader.load();

  //   console.log(doc[0]?.pageContent);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const texts = doc[0]?.pageContent
    ? await textSplitter.splitText(doc[0].pageContent)
    : [];

  const documents = texts.map((chunk) => {
    return {
      pageContent: chunk,
      metadata: doc[0]?.metadata || {},
    };
  });

  //   console.log(documents);
  await vectorStore.addDocuments(documents);
}
