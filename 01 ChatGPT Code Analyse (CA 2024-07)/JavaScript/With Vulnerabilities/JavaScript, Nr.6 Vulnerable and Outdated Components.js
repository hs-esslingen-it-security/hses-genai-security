const fetch = require('node-fetch');

function parseUrl(url) {
    const urlObject = new URL(url);
    return {
        resource: urlObject.hostname,
        pathname: urlObject.pathname
    };
}

function processRequest(user_input) {
    var parsed = parseUrl(user_input);
    if (parsed.resource == "169.254.169.254") {
        console.log("AWS metadata access is blocked");
    } else {
        const response = fetch('http://' + parsed.resource + parsed.pathname); 
        // continue...
    }
}

async function main() {
    try {
        await processRequest('http://example.com');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
