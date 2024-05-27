//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import {fastify } from "fastify";

const data = { error : false, users : ["John Doe","Lucita Esau", "Thomas Friedman", "Norma Helms", "Amy Manning"]  };



const app = fastify({
    ignoreTrailingSlash : true,
    keepAliveTimeout : 65 * 1000
});


//write the data into data.json file
async function writeData() {
    try {
        await fs.writeJson('./data.json', data);
        console.log('Data successfully written to data.json');
    } catch (err) {
        console.error('Error writing data to data.json:', err);
    }
}

writeData();

app.get('/',async (request,reply)=>{
    

    reply.header('Content-Type', 'text/html; charset=utf-8');
    // read the json here and insert the list names into the html
    const page =
    `<html>
        <head>
            <title>Wallethub Test</title>
        </head>
        <body>
            #Content
        </body>
    </html>`;

    try {
        const jsonData = await fs.readJson('./data.json');
        const users = jsonData.users;

        const usersHtml = users.map(user => `<p>${user}</p>`).join('');
        reply.send(page.replace("#Content",usersHtml));
    } catch (err) {

        let errorHtml = `<p>Error reading data.json</p>`;
        reply.send(page.replace("#Content",errorHtml));
    }
    
});

// server start
app.listen(8080,"0.0.0.0").then((address)=>{
    console.log(`Server started at ${address}`);
});