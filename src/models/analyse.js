import { API_HOST } from './_api';

const analyseText = async (text) => {
  const fetchURL = `${API_HOST}/api/entailment`
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

  try {
    const response = await fetch(fetchURL, fetchOptions)
    if (response.status !== 200) {
      throw Error(response.text())
    }
    const json = await response.json()
    return json;
  } catch (error) {
    return { error: String(error) };
  }
}

export default {
  analyseText
}