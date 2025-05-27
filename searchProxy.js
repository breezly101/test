// netlify/functions/searchProxy.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const query = event.queryStringParameters?.q;

  if (!query) {
    return {
      statusCode: 400,
      body: 'Missing "q" parameter for search query',
    };
  }

  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const body = await response.text();
    const contentType = response.headers.get('content-type') || 'text/html';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error fetching search results: ${err.message}`,
    };
  }
};
