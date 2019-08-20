
window.addEventListener("load", function() {
    document.querySelector("#doJson").addEventListener("click", function() {
        console.log("=============================================");
        console.log("JSON Output - Source from examples/01-json.js");
        console.log("=============================================");


        console.log("JSON can be stored as a String. If this was stored in a file, the extension should be .json");
        const json_string = '{ "someKey": "someValue", "aNumber": 42 }';
        console.log(json_string);
        console.log("\n-------\n");


        console.log("To work with JSON easily, we should read convert the JSON into a JavaScript object with JSON.parse()");
        let json_object = JSON.parse(json_string);
        console.log("\n-------\n");


        console.log("The browser inspector can show JSON in a navigable way if it is logged directly");
        console.log(json_object);
        console.log("\n-------\n");


        console.log("The properties from the JSON can now be accessed directly");
        console.log(`The value of someKey is ${json_object.someKey}`);
        console.log("\n-------\n");


        console.log("... and assigned directly");
        json_object.aNumber = 127;
        console.log(`The new value of aNumber is ${json_object.aNumber}`);
        console.log("\n-------\n");


        console.log("New properties can be added that contain any of the acceptable JSON types");
        json_object.newIntProperty = 57;
        json_object.newNumProperty = 123.456;
        json_object.newArrayProperty = [1, 2, 3];
        json_object.newObjectProperty = {
          aNestedKey: "A value",
          anotherNestedKey: 5
        };
        console.log(json_object);
        console.log("\n-------\n");


        console.log("Once new properties have been added, they can be accessed and assigned");
        let i = json_object.newIntProperty;
        json_object.newNumProperty = 67.987;
        console.log(json_object);
        console.log("\n-------\n");


        console.log("When it comes time to send or save the JSON somewhere we need to convert it to a string");
        let new_json_string = JSON.stringify(json_object);
        console.log(new_json_string);


        console.log("=============================================");
    });
});
