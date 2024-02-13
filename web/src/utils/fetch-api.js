/**
 * Fetch user api request
 * 
 * @param {String} url
 * @param {String} method
 * @param {Object} extraHeaders
 * @param {Array | Object} data
 * @param {Boolean} isJsonData
 * @returns json
 */
const fetchApi = async ({
    url,
    method = 'GET',
    extraHeaders = {},
    data = {},
    isJsonData = true
  }) => {
    try {
      if (extraHeaders['Content-Type'] === undefined && isJsonData) {
        extraHeaders['Content-Type'] = 'application/json';
      }
      const body = (method === 'GET' ? {} : { body: (isJsonData ? JSON.stringify(data) : data) });

      const response = await fetch(`${process.env.REACT_APP_SERVICE_API_URL}/${url}`, {
        method,
        headers: {
          ...extraHeaders
        },
        ...body
      });

      return await response.json();
    }
    catch(e) {
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: JSON.stringify(e)
      };
    }
}

export default fetchApi;
