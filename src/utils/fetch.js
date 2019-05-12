/**
 * please refer to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * options:
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
 */
const defaultOptions = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin'
}

function checkStatus(response) {
  //TODO: handle more
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const err = new Error(response.statusText)
  err.response = response
  throw err
}

/**
 * this is a flexibale http request method via fetch
 * @param {String} url request url
 * @param {JSON} options request options
 */
function request(url, options) {
  // handle more here
  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
  //.catch(err => console.error('Request[%s] failed:', url, err))
}

/**
 * get request
 * @param {String} url request url
 */
function get(url) {
  return request(
    url,
    Object.assign(defaultOptions, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
  )
}

/**
 * post request with JSON data
 * @param {String} url request url
 * @param {JSON} data request json data
 */
function post(url, data) {
  return request(
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
}

/**
 * post request with form data
 * @param {String} url request url
 * @param {JSON} data request form data
 */
function formPost(url, data) {
  return request(
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
}

export { get, post, formPost }
