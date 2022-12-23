// Fetch Request

async function sendFetchRequest({
  url,
  method = 'GET',
  body = null,
  headers = {},
}) {
  // Prevent errors if page is switched while this is loading, where we would
  // try to update the state of a component not on the screen anymore cancel
  // the ongoing http request using useRef hook it will turn into a reference:
  // data that will not change / be re-initialized when the page re-renders.
  let activeHttpRequests = [];
  const httpAbortCtrl = new AbortController();
  activeHttpRequests.push(httpAbortCtrl);

  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
      signal: httpAbortCtrl.signal,
      // credentials: 'include'
    });

    const responseData = await response.json(); // Should be the data.

    // If request was successful, filter out the specific AbortController for
    // this request; we don't try to cancel a request that already completed.
    activeHttpRequests = activeHttpRequests.filter(
      reqCtrl => reqCtrl !== httpAbortCtrl,
    );

    // Error may result in no response; but a 'successful' response may also
    // bring an error; to catch these errors, use `ok`.
    if (!response.ok) {
      console.error(responseData.message);
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    console.error(err.message || 'Something went wrong.');
    throw err;
  }
}

const _sendFetchRequest = sendFetchRequest;
export { _sendFetchRequest as sendFetchRequest };
