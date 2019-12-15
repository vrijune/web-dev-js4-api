window.addEventListener("load", function () {

    // EXAMPLE 1:
    /*    Chaining fetch requests with async await.
    * The second request depends on the result of the first one. */
    async function chainRequestsAsyncAwait() {
        let articleResponse = await fetch(`https://trex-sandwich.com/ajax/articles?id=1`);
        let articleJson = await articleResponse.json();
        let userResponse = await fetch(`https://trex-sandwich.com/ajax/users?id=${articleJson.author_id}`);
        let userJson = await userResponse.json();
        console.log(`Async await with fetch: ${articleJson.title} was written by ${userJson.first_name}`);
    }

    chainRequestsAsyncAwait();

    // EXAMPLE 2:

    /*    Chaining fetch requests with async await and using extra functions;
    this has the advantage of being able to get JSON objects directly and
    reuse functions elsewhere in your code*/
    async function asyncAwaitWithExtraFunctions(articleId) {
        let articleJson = await getFullArticleObj(articleId);
        let userJson = await getUserObj(articleJson.author_id);

        console.log(`Async await with fetch with extra functions: ${articleJson.title} was written by ${userJson.first_name}`);
    }

    async function getFullArticleObj(articleId) {
        let articleResponseObj = await fetch(`https://trex-sandwich.com/ajax/articles?id=${articleId}`);
        let articleJson = await articleResponseObj.json();
        return articleJson;
    }

    async function getUserObj(userId) {
        let userResponseObj = await fetch(`https://trex-sandwich.com/ajax/users?id=${userId}`);
        let userJsonObj = await userResponseObj.json();
        return userJsonObj;
    }

    asyncAwaitWithExtraFunctions(1);
});
