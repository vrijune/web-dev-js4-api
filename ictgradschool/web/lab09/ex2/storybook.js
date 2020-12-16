window.addEventListener("load", function () {

    // Use this variable to hold the endpoint response for the current page
    var currentPageInfo;

    // Variable for total page count here so it can be accessed by multiple functions
    var totalPageCount;

    // TODO: add click event listeners
    document.getElementById("turn-left").addEventListener("click", previous_page);
    document.getElementById("turn-right").addEventListener("click", next_page);

    initialisePage();

    async function initialisePage() {

        // TODO: Use a request to the first endpoint to get the information about the pages in the storybook
        let acticleResponse = await fetch(`https://trex-sandwich.com/ajax/story`);
        // TODO: Get a JSON object from the response
        let articleJson = await acticleResponse.json();
        // TODO: Set the totalPageCount variable to the total number of pages in the endpoint
        totalPageCount = articleJson.length;
        // TODO: Call the loadPage function and pass in the URL for the first page as a parameter
        loadPage(articleJson[0]);
    }

    async function loadPage(pageUrlToFetch) {
        // TODO: Use the fetch API to create a request to the story endpoint
        const response = await fetch(pageUrlToFetch);

        // TODO: Use the response.json() method to get a JSON Obj from the response and store the JSON in the global variable currentPageInfo
        // the currentPageInfo variable will be used by other functions
        currentPageInfo = await response.json();


        // TODO: Call the updatePageDisplay function
        updatePageDisplay();

    }


    function updatePageDisplay() {
        // TODO: Update the span element that displays the total page count to display the total page count
        let totalPage = document.querySelector("#total-page");
        totalPage.innerHTML = `${totalPageCount}`;


        // TODO: Update the span element that displays the current page number to display the current page number
        let currentPage = document.querySelector("#current-page");
        currentPage.innerHTML = `${currentPageInfo.page_number}`;

        // TODO: Update the div element for the right hand page div to display the content for the current page
        // Have a look at the structure of the data in the endpoint response to see the content property
        let rightPage = document.querySelector("#page-right");
        rightPage.innerHTML = `${currentPageInfo.content}`;


            // TODO: Create an image element, set the src attribute to the image property of the currentPageInfo JSONObject
               const image = document.createElement("img");
               image.src = `${currentPageInfo.image}`;

               // leftPage.innerHTML = `<img src="${currentPageInfo.image}">`;
            // TODO: Remove any existing HTML elements from the left hand page div
               let leftPage= document.querySelector("#page-left");
               leftPage.innerHTML = "";
               // leftPage.remove();

            // TODO: Append the image element to the left hand page div
                 leftPage.appendChild(image);


            }


    // This function will control what happens then we want to load the previous page
    function previous_page() {
        if (currentPageInfo.previous_page)
            loadPage(currentPageInfo.previous_page);
    }

    // This function will control what happens then we want to load the next page
    function next_page() {
    if(currentPageInfo.next_page)
        loadPage(currentPageInfo.next_page);
    }

});