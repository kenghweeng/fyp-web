import { API_HOST } from './_api';

const PAGE_SIZE = 30;
const ARTICLE_SOURCE_MAP = {
  "Channelnewsasia.com": 1,
  "todayonline.com": 2,
  "Straitstimes.com": 3,
};

const listArticles = async (page) => {
  const query = `?page=${page}&page_size=${PAGE_SIZE}`
  const fetchURL = `${API_HOST}/api/articles${query}`;
  const fetchOptions = {
    method: "GET",
  };
  const response = await fetch(fetchURL, fetchOptions)
  const json = await response.json()
  return json;
}

const retrieveArticle = async (id) => {
  const fetchURL = `${API_HOST}/api/articles/${id}`;
  const fetchOptions = {
    method: "GET",
  };
  const response = await fetch(fetchURL, fetchOptions);
  const json = await response.json();
  return json;
}

export default {
  PAGE_SIZE,
  ARTICLE_SOURCE_MAP,
  listArticles,
  retrieveArticle,
}