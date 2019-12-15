window.addEventListener("load", function() {
    document.querySelector("#doXhr").addEventListener("click", function() {
        console.log("================================================");
        console.log("XHR Output - Source from examples/02-ajax-xhr.js");
        console.log("================================================");

        let xhr = new XMLHttpRequest();

        /* onreadystatechange is the callback that will be called as the XHR progresses through its lifecycle. This
        * callback is supported by all browsers that can use XHR so you will most often see the body of XHR work
        * done inside this function. Other callbacks that fire at different stages of the XHR lifecycle are available
        * however, notably Internet Explorer and Edge have irregular support for these functions so they should be
        * avoided in favor of onreadystatechange if you wish to support those browsers */
        xhr.onreadystatechange = function() {
            // We can inspect the readyState property to see whether the XHR has completed
            switch (xhr.readyState) {
                case XMLHttpRequest.UNSENT:
                    console.log("Callback onreadystatechange - The XHR has been created but not sent yet");
                    break;

                case XMLHttpRequest.OPENED:
                    console.log("Callback onreadystatechange - The XHR has opened");
                    break;

                case XMLHttpRequest.LOADING:
                    console.log("Callback onreadystatechange - The XHR is loading");
                    break;

                case XMLHttpRequest.HEADERS_RECEIVED:
                    console.log("Callback onreadystatechange - The XHR has received headers");
                    break;

                case XMLHttpRequest.DONE:
                    console.log("Callback onreadystatechange - The XHR has loaded completely");
                    break;
            }

            // We want to do most of our work only once the XHR has loaded completely
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Check to make sure that the response was in the 200 (success) family
                if (xhr.status < 200 || xhr.status >= 300) {
                    console.log("Callback onreadystatechange - The XHR has loaded completely, but received a non-success response");
                    return;
                }

                // Read response in as JSON
                let jsonResponse = JSON.parse(xhr.responseText);

                console.log("Callback onreadystatechange - The XHR has responded with");
                console.log(jsonResponse);

                // Create new elements to hold response content
                let newDiv = document.createElement("div");
                let header = document.createElement("h1");
                let para = document.createElement("p");

                // Populate the new objects
                header.innerText = jsonResponse.title;
                para.innerText = jsonResponse.content;

                // Assemble the objects onto the page
                newDiv.append(header);
                newDiv.append(para);
                document.querySelector("#xhrDestination").append(newDiv);
            }
        };

        /* Can alternatively set the onReadyStateChange callback with addEventListener() */
        // xhr.addEventListener("readystatechange", function() {});

        /* All browsers except Internet Explorer and Edge support more granular callbacks */
        xhr.addEventListener("loadend", function() {
            console.log("Callback loadend - The XHR has loaded completely");
        });

        /* The parameterizeURL function can be found in lib/ajax-utilities.js . It generates a query string from a JSON
         * object and appends it to the provided string - saving you the trouble! */
        xhr.open("GET", parameterizeURL("https://trex-sandwich.com/ajax/articles", {id: 2}), true);
        xhr.send();
    });
});