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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching search results: ${error.message}`,
    };
  }
};
