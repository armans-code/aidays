import { WatsonXAI } from "@ibm-cloud/watsonx-ai";
import { IamAuthenticator } from "ibm-cloud-sdk-core";

// Initialize WatsonXAI service with proper authenticator
export const watsonxAIService = WatsonXAI.newInstance({
  version: "2024-05-31",
  serviceUrl: "https://us-south.ml.cloud.ibm.com",
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSONX_AI_APIKEY!,
  }),
});
