import { watsonxAIService } from "@/config/ibm";

const params = {
  input:
    "Classify the natural disaster severity level on a scale from 1-10. 10 being highest severity. Only return the value and nothing else.\n\nInput: {input_text}\nOutput:",
  modelId: "ibm/granite-3-8b-instruct",
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
