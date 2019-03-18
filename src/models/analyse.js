const DEV_API_HOST  = "http://localhost:9000";
const PROD_API_HOST = "http://www.pinocchionews.com:9000";
const HOST          = process.env.NODE_ENV === "production" ? PROD_API_HOST : DEV_API_HOST;


const analyseText = async (text) => {
    const fetchURL = HOST + `/api/analyse`
    
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