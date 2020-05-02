import { API_HOST } from './_api';

const analyseText = async (text) => {
  const fetchURL = `${API_HOST}/api/analyse`
  const fetchBody = {
    text: text
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fetchBody)
  }

  const response = await fetch(fetchURL, fetchOptions)
  const json = await response.json()
  const data = json.data;

  return data;
}

export default {
  analyseText
}