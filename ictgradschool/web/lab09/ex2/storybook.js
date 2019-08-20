window.addEventListener("load", function () {

    // Use this variable to hold the endpoint response for the current page
    var currentPageInfo;

    // Variable for total page count here so it can be accessed by multiple functions
    var totalPageCount;

    // TODO: add click event listeners

    initialisePage();

    async function initialisePage() {

        // TODO: Use a request to the first endpoint to get the information about the pages in the storybook

        // TODO: Get a JSON object from the response

        // TODO: Set the totalPageCount variable to the total number of pages in the endpoint

        // TODO: Call the loadPage function and pass in the URL for the first page as a parameter
    }

    async function loadPage(pageUrlToFetch) {
        // TODO: Use the fetch API to create a request to the story endpoint

        // TODO: Use the response.json() method to get a JSON Obj from the response and store the JSON in the global variable currentPageInfo
        // the currentPageInfo variable will be used by other functions

        // TODO: Call the updatePageDisplay function
    }

    function updatePageDisplay() {
        // TODO: Update the span element that displays the total page count to display the total page count

        // TODO: Update the span element that displays the current page number to display the current page number

        // TODO: Update the div element for the right hand page div to display the content for the current page
        // Have a look at the structure of the data in the endpoint response to see the content property

        // TODO: Create an image element, set the src attribute to the image property of the currentPageInfo JSONObject

        // TODO: Remove any existing HTML elements from the left hand page div

        // TODO: Append the image element to the left hand page div
    }

    // This function will control what happens then we want to load the previous page
    function previous_page() {

    }

    // This function will control what happens then we want to load the next page
    function next_page() {

    }

});