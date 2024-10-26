import { WatsonXAI } from "@ibm-cloud/watsonx-ai";
import { IamAuthenticator } from "ibm-cloud-sdk-core";

// Initialize WatsonXAI service with proper authenticator
const watsonxAIService = WatsonXAI.newInstance({
  version: "2024-05-31",
  serviceUrl: "https://us-south.ml.cloud.ibm.com",
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSONX_AI_APIKEY!,
  }),
});

const params = {
  input:
    "Classify the natural disaster severity level on a scale from 0-10. 10 being highest severity. Only return the value and nothing else.\n\nInput: {input_text}\nOutput:",
  modelId: "google/flan-ul2",
  parameters: {
    max_new_tokens: 100,
  },
};

export async function classifySeverity(inputText: string): Promise<number> {
  try {
    const updatedParams = {
      ...params,
      input: params.input.replace("{input_text}", inputText),
      projectId: process.env.WATSONX_AI_PROJECT_ID!,
    };
    const response = await watsonxAIService.generateText(updatedParams);
    console.log({ response: response.result.results[0].generated_text });
    return parseInt(response.result.results[0].generated_text, 10);
  } catch (err) {
    console.error("Error generating text:", err);
    throw err;
  }
}
