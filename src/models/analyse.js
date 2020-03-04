const HOST = `http://${window.location.host}:9000`;

const analyseText = async (text) => {
  const fetchURL = `${HOST}/api/analyse`    
  const fetchBody = {
    text: text
  }
  
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors"
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