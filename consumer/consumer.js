const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const routes = [];

const beautify = (json) => {
    return JSON.stringify(JSON.parse(json), undefined, 4);
}

const template = fs.readFileSync(path.join(__dirname, "template.md"));
const acceptableHeaders = ["origin", "authorization", "content-type", "accept", "user-agent"];

const routeData = JSON.parse(fs.readFileSync(path.join(__dirname, "discordapp.com.har")));
routeData.log.entries.forEach((entry, index) => {
    console.log(`[${index}] ${entry.request.method} - ${entry.request.url}`);
})
const dataEntry = routeData.log.entries[readline.questionInt("Which request are we documenting?\n")];
const urlNoHost = dataEntry.request.url.split(".com")[1];
const lastPath = urlNoHost.split("/")[urlNoHost.split("/").length - 1];
const requestMethod = dataEntry.request.method;
let fileName = `${requestMethod}-${lastPath}.md`;
const userFileNameOverride = readline.question(`What would you like to save this as? (${fileName})`);
if (userFileNameOverride.trim() !== '') fileName = userFileNameOverride;
let requestBody;
try {
    requestBody = beautify(dataEntry.request.postData.text);
} catch (e) {
    requestBody = "{\n\"noRequestBody\": \"There is no request body attached to this route\"\n}";
}
let responseBody;
try {
    responseBody = beautify(dataEntry.response.content.text);
} catch (e) {
    responseBody = "{\n\"noResponseBody\": \"There is no response body attached to this route\"\n}";
}
const headers = dataEntry.request.headers.filter(header => acceptableHeaders.indexOf(header.name) >= 0)
    .map(header => `${header.name}: ${header.name === 'authorization' ? '{{ your token}}' : header.value}`);
templateData = {
    "%route%": urlNoHost,
    "%request-method%": requestMethod,
    "%request%": requestBody,
    "%response%": responseBody,
    "%headers%": headers.join('\n')
};
templateData["%request-notes%"] = readline.question("What are your request body notes?\n");
templateData["%response-notes%"] = readline.question("What are your response notes?\n");
let output = template.toString();
Object.keys(templateData).forEach(key => {
    output = output.replace(key, templateData[key]);
});
fs.writeFile(path.join(__dirname, fileName), output, (e) => {
    if (e) {
        return console.log(e);
    }
    console.log(`Successfully saved to ./${fileName}`);
});
