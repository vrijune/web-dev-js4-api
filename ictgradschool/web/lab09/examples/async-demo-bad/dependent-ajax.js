window.addEventListener("load", function () {

    // Example of what NOT to do:

    // DO NOT DO THIS - an async function should always be called with await from within another async function
    alert(`Step 1: calling getFullArticleObj() function.`);
    let articleJson = getFullArticleObj(1);
    alert(`Step 5: received ${articleJson.author_id}`);

    // DO NOT DO THIS - an async function should always be called with await from within another async function
    alert(`Step 6: running second function using ${articleJson.author_id} as a parameter.`);
    let userJson = getUserObj(articleJson.author_id);

    alert(`Step 10: Not using async await properly: ${articleJson.title} was written by ${userJson.first_name}`);

    async function getFullArticleObj(articleId) {
        alert(`Step 2: getting article.`);
        let articleResponseObj = await fetch(`https://trex-sandwich.com/ajax/articles?id=${articleId}`);
        alert(`Step 3: received response: ID-${articleResponseObj.id}, next step, convert to JSON.`);
        let articleJson = await articleResponseObj.json();
        alert(`Step 4: converted ID-${articleJson.id} to JSON and returning JSON object.`);
        return articleJson;
    }

    async function getUserObj(userId) {
        alert(`Step 7: getting user JSON object.`);
        let userResponseObj = await fetch(`https://trex-sandwich.com/ajax/users?id=${userId}`);
        alert(`Step 8: received response ID-${userResponseObj.id}, next step, convert to JSON.`);
        let userJsonObj = await userResponseObj.json();
        alert(`Step 9: received response ID-${userResponseObj.id}, next step, convert to JSON.`);
        return userJsonObj;
    }

});
