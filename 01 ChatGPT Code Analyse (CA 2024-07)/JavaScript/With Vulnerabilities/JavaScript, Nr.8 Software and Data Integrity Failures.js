import url from "url";
import path from 'path';
import fs from 'fs';

const BASE_DIR = '/wwwroot';

function isValidUrl(inputUrl) {
    try {
        new URL(inputUrl);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
    } catch (e) {
        console.error("Error reading file:", e);
    }
}

export function getFileSystemPath(inputUrl) {
    const urlPath = url.parse(inputUrl).pathname;
    return path.join(BASE_DIR, urlPath);
}

function handleRequest(inputUrl) {
    if (!isValidUrl(inputUrl)) {
        console.log("Invalid URL provided.");
        return;
    }

    const filePath = getFileSystemPath(inputUrl);
    readFile(filePath);
}

handleRequest('http://example.com/myfile');
