/* eslint-disable no-console */

class FetchError extends Error {
  public response?: Response
}

/**
 * default options, please refer to 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @see 
```
{
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(options)
}
```
 */
const defaultOptions = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit'
}

/**
 * check fetch callback status
 * @param {Response} response
 * @throws {FetchError} fetch request failed
 */
function checkStatus(response: Response) {
  //TODO: handle more
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const err = new FetchError(response.statusText)
  err.response = response
  throw err
}

/**
 * this is a flexibale http request method via fetch
 * @param {String} url request url
 * @param {Object} options request options
 * @see {@link defaultOptions}
 */
function request(input: Request) {
  return fetch(input)
    .then(checkStatus)
    .then((response: Response) => response.json())
  // .catch(err => console.error('Request[%s] failed:', input.url, err))
}

/**
 * get request
 * @param url request url
 */
function get(url: string) {
  return request(
    new Request(
      url,
      Object.assign(defaultOptions, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
    )
  )
}

/**
 * post request with JSON data
 * @param url request url
 * @param data post data
 */
function post(url: string, data?: JSON) {
  return request(
    new Request(
      url,
      Object.assign(defaultOptions, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
      })
    )
  )
}

/**
 * post request with form data
 * @param url request url
 * @param data form data
 */
function formPost(url: string, data?: Record<string, string>) {
  return request(
    new Request(
      url,
      Object.assign(defaultOptions, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: new URLSearchParams(data)
      })
    )
  )
}

export { get, post, formPost, request }
