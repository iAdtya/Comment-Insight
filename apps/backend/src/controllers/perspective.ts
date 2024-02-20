import { google } from "googleapis";

export const getPerspective = async (comment: string) => {
  const API_KEY = "AIzaSyBs8qmyswTKPUTxP84pJZ1MLpLWCKc1yT0";
  const DISCOVERY_URL =
    "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

  // const comments = "You are a bad person i wanna kill you!!";

  try {
    const client = await google.discoverAPI(DISCOVERY_URL);
    const analyzeRequest = {
      comment: {
        text: comment,
      },
      requestedAttributes: {
        TOXICITY: {},
        INSULT: {},
        THREAT: {},
      },
    };

    const response = await (client as any).comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });

    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (err) {
    throw err;
  }
};
// I'm using perspective API I want you to create a column chart with a. chart with the help of multiple attributes for a single comment. Those attributes are toxicity insult, severe toxicity, identity attack, profanity and threat. These attributes are for single comment. I want you to create a column chart for multiple comments. using this attribute.
