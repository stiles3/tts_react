const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
  }
  const data = await response.json();
  return data.content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  let newContent = content;

  newContent = newContent.replaceAll("<speak>", "");
  newContent = newContent.replaceAll("</speak>", "");
  let arrayContent = newContent.split("<s>");
  let newArrayContent = [];
  for (let item of arrayContent) {
    if (item.trim().length > 0) {
      item = item.replaceAll("<s>", "");
      item = item.replaceAll("</s>", "");
      item = item.replaceAll("<p>", "");
      item = item.replaceAll("</p>", "");
      newArrayContent.push(item);
    }
  }

  return newArrayContent;
};

export { fetchContent, parseContentIntoSentences };
