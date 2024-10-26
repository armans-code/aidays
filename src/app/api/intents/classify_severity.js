const dotenv = require('dotenv');
const path = require('path');

// *CHANGE* Load environment variables from "watson.env" file
dotenv.config({ path: path.join(__dirname, 'watson.env') });

const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');
const { IamAuthenticator } = require('ibm-cloud-sdk-core'); // Import the IamAuthenticator

//console.log('Auth Type:', process.env.WATSONX_AI_AUTH_TYPE);
//console.log('API Key:', process.env.WATSONX_AI_APIKEY);

// Initialize WatsonXAI service with proper authenticator
const watsonxAIService = WatsonXAI.newInstance({
  version: '2024-05-31',
  serviceUrl: 'https://us-south.ml.cloud.ibm.com',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSONX_AI_APIKEY,
  }),
});

const params = {
  input: 'Classify the natural disaster severity level on a scale from 0-10. 10 being highest severity\n\nInput: {input_text}\nOutput:',
  modelId: 'google/flan-ul2',
  parameters: {
    max_new_tokens: 100,
  },
};

async function classifySeverity(inputText) {
  try {
    const updatedParams = {
      ...params,
      input: params.input.replace('{input_text}', inputText),
      projectId: process.env.WATSONX_AI_PROJECT_ID
    };
    const response = await watsonxAIService.generateText(updatedParams);
    console.log({ response: response.result.results[0].generated_text });
    return response.result.results[0].generated_text;
  } catch (err) {
    console.error('Error generating text:', err);
    throw err;
  }
}

// Example usage:
// classifySeverity("A category 5 hurricane is approaching a densely populated coastal city.");
