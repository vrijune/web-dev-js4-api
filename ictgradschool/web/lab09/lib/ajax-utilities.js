/* Build a GET URL using a base URL, and a key: value object map that will make up the parameters to use.
*
* This function will ensure that parameter names and values are URLEncoded.
*
* Example usage:
*
* parameterizeURL('https://example.com/thing', { id: 5, name: "bob" });
*   Returns: "https://example.com/thing?id=5&name=bob
*
*/
function parameterizeURL(url, params) {
    let urlParameters = Object.entries(params).map(e => e.join('=')).join('&');
    return `${url}?${urlParameters}`;
}


/**
 * Create a fetch promise from parameters, automatically configuring parameters based on the method.
 *
 * If method = GET, parameters will be URL encoded
 * If method = POST, parameters will be embedded as a JSON string in the message body
 *
 * DAdditional init options can be provided in the opts_extra parameter.
 *
 * Example usage:
 *
 * buildFetch('https://example.com/thing', 'POST', {id: 7, data: "Hello there"}).then((resp) => {...});
 *
 */
function buildFetch(url, method, params, opts_extra = undefined) {
    method = method.toUpperCase();

    /* Set default options */
    let opts = {
        method: method
    };

    /* Copy extra options in if they were provided */
    if (opts_extra) {
        for (let key in opts_extra) {
            opts[key] = opts_extra[key];
        }
    }

    switch (method) {
        case "GET":
            url = parameterizeURL(url, params)
            break;
        case "POST":
            opts[body] = JSON.stringify(params);
            break;
        default:
            Error(`Unsupported method "${method}"`);
    }

    return fetch(url, opts)
}
