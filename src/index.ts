import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";

const interpolateRegex = /%.+%/g;
const urlRegex = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g;
inquirer.registerPrompt('list-input', require('inquirer-list-input'));

function beautify(content: any) {
    try {
        return JSON.stringify(JSON.parse(content), undefined, 4);
    } catch {
        return content;
    }
}

class Consumer {
    async main() {
        const har = await inquirer.prompt({
            type: 'input',
            name: 'har',
            message: 'Where is the har file?',
            default: path.join(__dirname, "requests.har")
        }).then(({har: path}) => fs.readJSON(path));

        const template = await inquirer.prompt({
            type: 'input',
            name: 'template',
            message: 'Where is the template?',
            default: path.join(__dirname, "template.md")
        }).then(({template: path}) => fs.readFile(path)).then(file => file.toString());

        // global headers as well as any extras per-request
        console.log(har.log.entries[0].request.headers);
        const allHeaders: string[] = har.log.entries.reduce((a,c) => a.concat((c.request.headers as any[]).map(h => h.name as string)), [])
                                          .reduce((a: any[], c: string) => {
                                              if (a.indexOf(c) === -1) a.push(c);
                                              return a;
                                          }, []);

        const globals: string[] = (await inquirer.prompt({
            type: 'checkbox',
            name: 'globals',
            message: 'What headers are to be included in all requests (where possible)',
            choices: allHeaders
        })).globals;
        
        const requests: any[] = await inquirer.prompt({
            type: "checkbox",
            name: "requests",
            message: 'What requests are included?',
            choices: har.log.entries.map(({request: r}, i) => ({name: `${r.method} - ${r.url}`, value: i}))
        }).then(({requests: r}) => r.map((c) => har.log.entries[c]));

        // fields to be interpolated in the template
        let fields: string[] = [];
        let tpl: RegExpExecArray;

        // matches all percent statements
        while((tpl = interpolateRegex.exec(template)!) !== null) {
            fields.push(tpl[0]);
        }
        
        requests.forEach(async req => {
            const headerNames: string[] = req.request.headers.map(h => h.name);

            // have user specify if they want to include additional headers after globals
            const includeHeaders: string[] = (await inquirer.prompt({
                type: 'checkbox',
                name: 'headers',
                message: 'What headers are to be included in this doc?',
                choices: headerNames,
                default: globals.filter(g => headerNames.includes(g))
            })).headers;

            // maps included header keys to their key/values
            const headers = includeHeaders.map(h => ({
                key: h,
                value: req.request.headers[headerNames.indexOf(h)].value
            }));

            let stringHeaders = headers.map(h => `${h.key}: ${h.value}`);

            // allow user to replace any header values with templates if they see fit
            const editHeaders: string[] = (await inquirer.prompt({
                type: 'checkbox',
                name: 'edit',
                message: 'What header values would you like to edit?',
                choices: stringHeaders
            })).edit;

            for (let edit of editHeaders) {
                let headerObj = headers[stringHeaders.indexOf(edit)];

                headerObj.value = (await inquirer.prompt({
                    type: 'input',
                    name: 'newVal',
                    message: `What's the replacement value for ${headerObj.value}?`,
                    default: headerObj.value
                })).newVal;
            }

            // recompute string headers
            const headersString = headers.map(h => `${h.key}: ${h.value}`).join('\n');

            // dictionary of template values
            const templateValues = {
                route: `/${urlRegex.exec(req.request.url)![3]}`,
                method: req.request.method,
                request: (req.request.postData && req.request.postData.text) ? beautify(req.request.postData.text) : '',
                response: (req.response.content && req.response.content.text) ? beautify(req.response.content.text) : '',
                ['request-notes']:( await inquirer.prompt({
                    type: 'input',
                    name: 'notes',
                    message: 'What are your request notes?'
                })).notes,
                ['response-notes']: (await inquirer.prompt({
                    type: 'input',
                    name: 'notes',
                    message: 'What are your response notes?'
                })).notes,
                headers: headersString
            }

            // replace occurances with their template values
            let text = template;

            fields.forEach(field => {
                text = text.replace(field, templateValues[field.split('%')[1]] || '???');
            });

            console.log(text);
        })
    }
}

new Consumer().main();