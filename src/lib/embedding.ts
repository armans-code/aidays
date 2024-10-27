import { watsonxAIService } from "@/config/ibm";

export async function generateEmbedding(text: string): Promise<number[]> {
  const res = await watsonxAIService.embedText({
    modelId: "ibm/slate-125m-english-rtrvr-v2",
    inputs: [text],
    projectId: process.env.WATSONX_AI_PROJECT_ID
  });
  return res.result.results[0].embedding;
}
