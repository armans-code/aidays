import { watsonxAIService } from "@/config/ibm";

const params = {
  input:
    "Given a community post detailing an individual’s immediate needs (e.g., running low on food, needing shelter, medical supplies, or other essentials), generate a clear, practical recommendation for a responder. Include specific actions to take, resources required, any local points of contact, and a timeline for response. Use urgency indicators if needed.\n\nExamples:\n\nInput: I'm running low on food.\nOutput: Coordinate a local food bank or community pantry to prepare an emergency food package. Assign a nearby responder to deliver within the next 24 hours. Check on additional food needs, and schedule a follow-up in three days.\n\nInput: Need medical supplies for chronic condition.\nOutput: Contact local pharmacy for the requested supplies. Arrange immediate delivery, if possible, and coordinate with healthcare partners for a longer-term supply plan. Follow up in two days to ensure needs are met.\n\nInput: Running low on clean drinking water.\nOutput: Identify nearby clean water distribution points or coordinate with local relief agencies to supply bottled water. Assign a responder to deliver within 6 hours, and arrange for ongoing weekly deliveries if necessary. Include instructions for safe water storage if supplies are limited.\n\nInput: Need shelter due to severe weather.\nOutput: Direct the individual to the nearest emergency shelter with current availability. Arrange immediate transportation if required. Ensure the shelter has essentials like blankets, food, and water, and follow up within 24 hours to confirm safe arrival. Coordinate longer-term housing options if the weather impacts continue.\n\nInput: My family is cold; need extra blankets.\nOutput: Identify nearby shelters, donation centers, or relief agencies that can provide blankets and warm clothing. Arrange immediate delivery, ideally within 12 hours, and confirm if additional heating resources are needed. Include a resource list with warming center locations.\n\nInput: Haven’t eaten in two days; need food urgently.\nOutput: Coordinate with local food banks or meal delivery services to provide a food package within the next 3 hours. Contact a volunteer or responder in the vicinity to assist with delivery and confirm that the recipient has ongoing access to food.\n\nInput: Lost power and need batteries and a flashlight.\nOutput: Prepare an emergency power kit with batteries, flashlight, and other essentials. Arrange delivery within the next 2 hours and provide contact information for additional assistance. Schedule a follow-up to address any further power-related needs.\n\nInput: I think someone’s breaking into my neighbor's vacant house.\nOutput:Immediately notify local law enforcement and provide them with details about the situation. If safe to do so, gather more information about the potential intruder's appearance and behavior to assist police with their response. Follow up with the neighbor to ensure their property is secured.",
  modelId: "google/flan-ul2",
  parameters: {
    max_new_tokens: 200,
  },
};

export async function generateRecommendation(inputText: string): Promise<string> {
  try {
    const updatedParams = {
      ...params,
      input: params.input.replace("{input_text}", inputText),
      projectId: process.env.WATSONX_AI_PROJECT_ID!,
    };
    const response = await watsonxAIService.generateText(updatedParams);
    const recommendation = response.result.results[0].generated_text.trim();
    console.log({ response: recommendation });
    return recommendation;
  } catch (err) {
    console.error("Error generating recommendation:", err);
    throw err;
  }
}
