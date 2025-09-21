import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { vectorStore } from "./pdfLoder";
import { log } from "node:console";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function chat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("you:");
    if (question == "/bye") {
      break;
    }

    const relevantInfo = await vectorStore.similaritySearch(question, 3);
    const context = relevantInfo.map((chunk) => chunk.pageContent).join("\n\n");
    // console.log(context);

    const SYSTEM_PROMT =
      "you are the assistant for question/answer thing based on the provided relevant document and if you do not know answer simply say i do not know ";

    const userQuery = `Question: ${question}
  relevant docs = ${context}
  Answer: `;
    const completion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: userQuery,
          },
        ],
        model: "llama-3.1-8b-instant",
      })
      .then((chatCompletion) => {
        console.log(
          `Assistant: ${chatCompletion.choices[0]?.message?.content || ""}`
        );
      });
  }

  rl.close();
}

chat();
