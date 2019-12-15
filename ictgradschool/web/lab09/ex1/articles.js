window.addEventListener("load", function () {

    async function displayArticles(){
        let articlesResponseObj = await fetch(`https://trex-sandwich.com/ajax/articles`);
        let articleArray = await articlesResponseObj.json();
        displayJSONString(articleArray);
        for (let i = 0; i < articleArray.length; i++) {
            displayPartialArticleOnPage(articleArray[i]);
        }
    }

    function displayPartialArticleOnPage(articleObj) {
        let articleDivElement = document.createElement("div");

        articleDivElement.innerHTML = `
            <h3 class="article-title">${articleObj.title}</h3>
            <p class="article-body">${articleObj.content}</p>
        `;

        let articlesDiv = document.querySelector("#articles-inner");
        articlesDiv.appendChild(articleDivElement);
    }

    // Extra function to display JSON string in DOM so that you can view it
    function displayJSONString(jsonArray){
        let jsonString = JSON.stringify(jsonArray);
        let jsonDiv = document.querySelector("#json-string");
        jsonDiv.innerText = jsonString;
    }

    displayArticles();

});