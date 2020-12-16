window.addEventListener("load", function () {
    /* Variables to control where the application is with loading articles and how many it should load at a time */
    const loadArticleCount = 2;
    let loadArticleNext = 0;
    document.querySelector("#article-load-button").addEventListener('click', displayNextArticlesOnPage);

    displayNextArticlesOnPage();

    async function displayNextArticlesOnPage() {
        document.querySelector('#article-load-button').removeEventListener("click", displayNextArticlesOnPage);

        let articlesJsonArray = await getArticleArray(loadArticleNext, loadArticleCount);

        for (let i = 0; i < articlesJsonArray.length; i++) {
            let authorObj = await getUserObj(articlesJsonArray[i].author_id);
            displayPartialArticleOnPage(articlesJsonArray[i], authorObj);
        }
        document.querySelector('#article-load-button').addEventListener("click", displayNextArticlesOnPage);
    }

    function displayPartialArticleOnPage(articleObj, authorObj) {
        let articleDivElement = document.createElement("div");
        articleDivElement.classList.add("article");

        articleDivElement.innerHTML = `
            <h3 class="article-title">${articleObj.title}</h3>
            <h4 class="article-author" data-author-id="${authorObj.id}">${authorObj.first_name} ${authorObj.last_name}</h4>
            <p class="article-body">${articleObj.content}</p>
            <div class="article-read-more button" data-article-id="${articleObj.id}">Show full content</div>
        `;

        let articlesDiv = document.querySelector("#articles-inner");
        articlesDiv.appendChild(articleDivElement);


        articleDivElement.querySelector('.article-author').addEventListener('click', displayAuthorDetailsOnPage);
        articleDivElement.querySelector('.article-read-more').addEventListener('click', displayFullArticleOnPage);
    }

    // parameterised async functions for all requests
    // returning from async function means that they will need to be used within an async function
    async function getArticleArray(from, count) {
        let articlesResponseObj = await fetch(`https://trex-sandwich.com/ajax/articles?from=${from}&count=${count}`);
        loadArticleNext += loadArticleCount;

        let articlesJsonArray = await articlesResponseObj.json();
        if(articlesJsonArray.length === 0 ){
            document.querySelector('#article-load-button').style.backgroundColor="red";

            document.querySelector('#article-load-button').removeEventListener("click", displayNextArticlesOnPage);
        }
        return articlesJsonArray;
    }

    async function getUserObj(userId) {
        let userResponseObj = await fetch(`https://trex-sandwich.com/ajax/users?id=${userId}`);
        let userJsonObj = await userResponseObj.json();
        return userJsonObj;
    }

    async function getFullArticleObj(articleId) {
        // TODO: use fetch to get a full article based on the id parameter and get a JSON object from the response
        let fullArticle = await fetch(`https://trex-sandwich.com/ajax/articles?id=${articleId}`);
        let FullActicleJson = await fullArticle.json();


        // TODO: return the JSON object from this function

        return FullActicleJson;
    }

    async function getLikesArray(userId) {
        // TODO: use fetch to get an array of likes based on the id parameter and get a JSON object from the response
        let likes = await fetch(`https://trex-sandwich.com/ajax/likes?user=${userId}`);
        let likeJson = await likes.json();

        // TODO: return the JSON object from this function
        return likeJson;
    }

    async function displayFullArticleOnPage(event) {
        // The event parameter is used to get information about the element that was clicked
        // Observe here how the data-* attribute of the element that was clicked can be accessed
        let articleId = event.target.getAttribute("data-article-id");

        // TODO: use the getFullArticleObj(..) function to get a JSON object containing a full article
        let fullArticleObj = await getFullArticleObj(articleId);

        // TODO: use the full article text in the JSON object to update the full article text
        // You may need to research a way to select the correct div as it is a sibling of the div that was clicked
        let contentSection = event.target.previousElementSibling;
        contentSection.innerHTML = `${fullArticleObj.content}`;


    }

    async function displayAuthorDetailsOnPage(event) {
        // The event parameter is used to get information about the element that was clicked
        // Observe here how the data-* attribute of the element that was clicked can be accessed
        let authorId = event.target.getAttribute("data-author-id");

        // TODO: use the getUserObj() function to get a JSON object containing the author information
        let userObj = await getUserObj(authorId);
        // TODO: Display author details in appropriate divs

        let fN = document.querySelector("#user-details-first-name");
        fN.innerHTML = `${userObj.first_name}`;

        let LN = document.querySelector("#user-details-last-name");
        LN.innerHTML = `${userObj.last_name}`;

        let gender = document.querySelector("#user-details-gender");
        gender.innerHTML = `${userObj.gender}`;


        // TODO: use the getLikesArray() function to get a JSON object with an array of articles that user likes
        let likeObj = await getLikesArray(authorId);

        // let likeSection = document.querySelector("#user-details-liked-articles");
        // likeSection.innerHTML = `${likeObj}`;

        // TODO: loop through the array of liked articles and use the getFullArticleObj() function
        // to display the name of each article that user likes. The names of each article should be displayed
        // in a list. See the example image if you are unsure what it should look like

        let text = "";
        for (let i = 0; i < likeObj.length; i++) {
            const names = await getFullArticleObj(likeObj[i]);
            console.log(names);

            text += "<li>" + names.title + "</li>";


        }
        console.log(text);
        let name = document.querySelector("#user-details-liked-articles");
        name.innerHTML = text;
    }
});