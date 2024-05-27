//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";

    if(resp.statusCode !== 200) return;
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Parse the result and print the hobbies.
    resp.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            if (jsonData.hobbies && Array.isArray(jsonData.hobbies)) {
                const hobbies = jsonData.hobbies.join(', ');
                console.log(hobbies);
            } else {
                console.log("Hobbies not found or not an array");
            }
        } catch (e) {
            console.error("Error parsing JSON", e);
        }
    });
})