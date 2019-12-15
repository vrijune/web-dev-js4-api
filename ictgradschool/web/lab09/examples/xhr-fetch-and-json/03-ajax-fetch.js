window.addEventListener("load", function() {
    document.querySelector("#doFetch").addEventListener("click", function () {

        /* buildFetch is another function found in lib/ajax-utilities.js . It will automatically configure a fetch
         * request to use a querystring URL for GET requests, or provide json parameters in a request body with the
         * same interface.
         *
         * The official way to use the fetch API would be to use the fetch() function here. You can find the documentation
         * for it here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
        buildFetch("https://trex-sandwich.com/ajax/story", "GET", { page: 2 })

            /* The fetch API is built on 'promises' - objects that will contain data, eventually. We can await these
             * promises to be fulfilled and then do something with them. .then() functions can be chained onto the
             * fetch() call to perform operations on the returned value when it arrives. */
            .then(function(response) {

                /* The first thing returned from fetch() will be a response object. This will contain content, as well
                 * header items like status codes. As with XHR, we should check the status for success/error before
                 * doing anything more */
                if (response.status === 200) {

                    /* The response object contains all the headers and associated stuff that we are not interested in.
                     * we can 'unpack' the response content of this object with the .text() method - equivalent to the
                     * xhr.responseText property when dealing with XHR - which will give plain text back. Alternatively
                     * we can use .json() to convert the text straight into json. By returning this value, we pass it
                     * on to the next processing step */
                    return response.json();
                }
            })

            /* We can chain together multiple '.then()' statements to break the processing up into smaller chunks. Each
             * subsequent function will receive as a parameter the value returned from the previous .then() statement. */
            .then(function(json) {
                /* Log out the received JSON */
                console.log(json);

                // Create new elements to hold response content
                let newDiv = document.createElement("div");
                let header = document.createElement("h1");
                let para = document.createElement("p");

                // Populate the new objects
                header.innerText = json.image;
                para.innerText = json.content;

                // Assemble the objects onto the page
                newDiv.append(header);
                newDiv.append(para);
                document.querySelector("#fetchDestination").append(newDiv);
            });
    });
});