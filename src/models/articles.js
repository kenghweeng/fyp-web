const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://128.199.101.98:9200',
});

const PAGE_SIZE = 30

// Page should start from 0
const searchAllDocuments = async (page) => {
    const pageStart = page * PAGE_SIZE;

    const response = await client.search({
        index: 'articles',
        type: '_doc',
        size: PAGE_SIZE,
        from: pageStart,
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return response.hits.hits;
}

const searchDocuments = async (query) => {
    const response = await client.search({
        index: 'articles',
        type: '_doc',
        size: PAGE_SIZE,
        body: {
            query: {
                bool: {
                    should: [
                      {
                        match: {
                          title: {
                            query: query,
                            boost: 5
                          }
                        }
                      },
                      {
                        match: {
                          content: {
                            query: query,
                            boost: 3
                          }
                        }
                      }
                    ]
                }
            }
        }
    });

    return response.hits.hits;
}

const searchArticleById = async (id) => {
    const response = await client.search({
        index: 'articles',
        type: '_doc',
        body: {
            query: {
                match: {
                    "_id": id
                }
            }
        }
    });
    return response.hits.hits[0]
}

export default {
    PAGE_SIZE,
    searchAllDocuments,
    searchDocuments,
    searchArticleById
}


