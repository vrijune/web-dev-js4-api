window.addEventListener("load", function () {

    // EXAMPLE 1:
    chainRequestsAsyncAwait();
/*    Chaining fetch requests with async await*/
    async function chainRequestsAsyncAwait() {
        let articleResponse = await fetch(`https://sporadic.nz/ajax/articles?id=1`);
        let articleJson = await articleResponse.json();

        let userResponse = await fetch(`https://sporadic.nz/ajax/users?id=${articleJson.author_id}`);
        let userJson = await userResponse.json();

        console.log(`Async await with fetch: ${articleJson.title} was written by ${userJson.first_name}`);
    }

    // EXAMPLE 2:
    asyncAwaitWithExtraFunctions(1);
    /*    Chaining fetch requests with async await and using extra functions
    this has the advantage of being able to get JSON objects directly and
    reuse functions elsewhere in your code*/
    async function asyncAwaitWithExtraFunctions(articleId) {
        let articleJson = await getFullArticleObj(articleId);
        let userJson = await getUserObj(articleJson.author_id);

        console.log(`Async await with fetch with extra functions: ${articleJson.title} was written by ${userJson.first_name}`);
    }

    async function getFullArticleObj(articleId) {
        let articleResponseObj = await fetch(`https://sporadic.nz/ajax/articles?id=${articleId}`);
        let articleJson = await articleResponseObj.json();
        return articleJson;
    }

    async function getUserObj(userId) {
        let userResponseObj = await fetch(`https://sporadic.nz/ajax/users?id=${userId}`);
        let userJsonObj = await userResponseObj.json();
        return userJsonObj;
    }

    // EXAMPLE 3:
    chainRequestsDotThen();
    /*    Chaining fetch requests with promises (no Lambda syntax) and using the data from both
    This has issues with passing additional parameters into chained callbacks
    having a block level variable to store data from the first request is one way to handle this
    The implicit Promise object from .json() is quite difficult for a novice to use this and understand
    logically what is happening behind the scenes*/
    function chainRequestsDotThen() {
        let articleObject;
        fetch(`https://sporadic.nz/ajax/articles?id=1`)
            .then(function (articleResponseObj) {
                // Run the .json() method on the response object
                return articleResponseObj.json()
            })
            .then(function (articleJson) {
                articleObject = articleJson;
                return fetch(`https://sporadic.nz/ajax/users?id=${articleJson.author_id}`)
            })
            .then(function (userResponseObj) {
                return userResponseObj.json()
            })
            .then(function (userJson) {
                console.log(`Fetch with chained promises and no async await: ${articleObject.title} was written by ${userJson.first_name}.`)
            })
            .catch(function (error) {
                console.log('Requestfailed', error)
            });
    }

    // EXAMPLE 4:
    chainRequestsDotThenLambdas();

    /*    Chaining fetch requests with promises (Lambda syntax) and using the data from both
    while this simplifies the syntax a little bit I don't think that marginally simpler
    syntax makes*/

    function chainRequestsDotThenLambdas() {

        let articleObject;

        fetch(`https://sporadic.nz/ajax/articles?id=1`)
            .then(articleResponse => articleResponse.json())
            .then(articleJson => {
                articleObject = articleJson;
                return fetch(`https://sporadic.nz/ajax/users?id=${articleJson.author_id}`)
            })
            .then(response => response.json())
            .then(userJson => {
                console.log(`Fetch with chained promises with lambdas: ${articleObject.title} was written by ${userJson.first_name}.`)
            })
            .catch(function (error) {
                console.log('Requestfailed', error)
            });
    }


    // EXAMPLE 5:
    chainVanillaXhrWithNesting();
    /*    Chaining two vanilla XHRs and using the data from both
    2 levels of nested requests are used here to control
    the dependence of one request on the prior request
    this can make the control flow and logic difficult to trace*/
    function chainVanillaXhrWithNesting() {

        let xhrArticle = new XMLHttpRequest();

        // Retrieve the list of liked articles for this user
        xhrArticle.onreadystatechange = function () {
            if (xhrArticle.readyState === XMLHttpRequest.DONE && xhrArticle.status === 200) {
                let articleJson = JSON.parse(xhrArticle.responseText);

                let xhrAuthor = new XMLHttpRequest();

                xhrAuthor.onreadystatechange = function () {
                    if (xhrAuthor.readyState === XMLHttpRequest.DONE && xhrAuthor.status === 200) {
                        let userJson = JSON.parse(xhrAuthor.responseText);
                        //
                        console.log(`Vanilla XHR with nesting: ${articleJson.title} was written by ${userJson.first_name}.`)
                    }

                };

                xhrAuthor.open("GET", `https://sporadic.nz/ajax/users?id=${articleJson.author_id}`, true);
                xhrAuthor.send();

            }
        };

        xhrArticle.open("GET", `https://sporadic.nz/ajax/articles?id=1`, true);
        xhrArticle.send();

    }

    // EXAMPLE 6:
    chainVanillaXhrWithNestedCall();

    // Chaining two vanilla XHRs with a nested call and using the data from both through parameter passing
    // this avoids excessive nesting but in more contextualised problems managing scope between both
    // function calls can become difficult for novices
    function chainVanillaXhrWithNestedCall() {

        let xhrArticle = new XMLHttpRequest();

        // Retrieve the list of liked articles for this user
        xhrArticle.onreadystatechange = function () {
            if (xhrArticle.readyState === XMLHttpRequest.DONE && xhrArticle.status === 200) {

                let articleJson = JSON.parse(xhrArticle.responseText);
                chainVanillaXhrWithNestedCallTwo(articleJson);
            }
        };

        xhrArticle.open("GET", `https://sporadic.nz/ajax/articles?id=1`, true);
        xhrArticle.send();

    }

    // Chaining two vanilla XHRs with a nested call and using the data from both
    function chainVanillaXhrWithNestedCallTwo(articleJson) {

        let xhrAuthor = new XMLHttpRequest();

        xhrAuthor.onreadystatechange = function () {
            if (xhrAuthor.readyState === XMLHttpRequest.DONE && xhrAuthor.status === 200) {
                let userJson = JSON.parse(xhrAuthor.responseText);

                console.log(`Vanilla XHR nested call: ${articleJson.title} was written by ${userJson.first_name}.`)
            }

        };

        xhrAuthor.open("GET", `https://sporadic.nz/ajax/users?id=${articleJson.author_id}`, true);
        xhrAuthor.send();

    }


    // EXAMPLE 7:
    runPromiseReturningXHRGeneric();

    /*    Using a parameterised generic function that returns a new Promise object
    this is not easy to understand for someone who is new to Promises and AJAX
    but it is a good way to use XHR without*/
    function runPromiseReturningXHRGeneric() {
        let articleObject;

        promiseReturningXHRGeneric(`https://sporadic.nz/ajax/articles?id=1`)
            .then(function (articleJson) {
                articleObject = articleJson;
                return promiseReturningXHRGeneric(`https://sporadic.nz/ajax/users?id=${articleJson.author_id}`);
            })
            .then(function (userJson) {
                console.log(`Promise returning generic: ${articleObject.title} was written by ${userJson.first_name}.`);
            })
            .catch(function (error) {
                console.log('Something went wrong', error);
            });
    }

    function promiseReturningXHRGeneric(url, method) {
        // Create the XHR request
        var request = new XMLHttpRequest();
        // Return it as a Promise
        return new Promise(function (resolve, reject) {
            // Setup our listener to process compeleted requests
            request.onreadystatechange = function () {
                // Only run if the request is complete
                if (request.readyState !== 4) return;
                // Process the response
                if (request.status >= 200 && request.status < 300) {
                    // If successful
                    let responseJSONObj = JSON.parse(request.responseText);
                    resolve(responseJSONObj);
                } else {
                    // If failed
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            };
            // Setup our HTTP request
            request.open(method || 'GET', url, true);
            // Send the request
            request.send();

        });
    }


});