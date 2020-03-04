const API_ROOT = `http://${window.location.origin}:9000`;
const PAGE_SIZE = 30

const ARTICLE_SOURCE_MAP = {
  "Channelnewsasia.com": 1,
  "todayonline.com": 2,
  "Straitstimes.com": 3,
  "Scmp.com": 4
}

const retrieveArticles = async (page) => {
  const fetchURL = API_ROOT + `/api/articles?page=${page}`
  const fetchOptions = {
    method: "GET",
    headers: {
      mode: "no-cors"
    }
  }
  const response = await fetch(fetchURL, fetchOptions)
  const json = await response.json()
  const articles = json.data;
  return articles;
}

const searchArticleById = async (id) => {
  const fetchURL = API_ROOT + `/api/article/${id}`
  const fetchOptions = {
    method: "GET",
    headers: {
      mode: "no-cors"
    }
  }
  const response = await fetch(fetchURL, fetchOptions)
  const json = await response.json()
  const article = json.data;
  return article;
}

const searchArticles = async (query) => {
  const fetchURL = API_ROOT + "/api/articles/search";
  
  const fetchBody = {
    query: query
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
  const articles = json.data;
  return articles;
}


const searchRelatedArticlesById = async (id) => {
  const fetchURL = API_ROOT + `/api/articles/${id}/related-articles`;
  const fetchOptions = {
    method: "GET",
    headers: {
      mode: "no-cors"
    }
  }
  const response = await fetch(fetchURL, fetchOptions)
  const json = await response.json()
  const articles = json.data;
  return articles;
}



const searchRelatedArticlesBySentence = async (sentence) => {
  const fetchURL = API_ROOT + `/api/articles/search-sentence`;
  
  const fetchBody = {
    sentence: sentence
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
  const articles = json.data;
  return articles;
}

export default {
  PAGE_SIZE,
  ARTICLE_SOURCE_MAP,
  retrieveArticles,
  searchArticles,
  searchArticleById,
  searchRelatedArticlesById,
  searchRelatedArticlesBySentence,
}