const generateMarkdown = require("./utils/generateMarkdown");
var fs = require('fs')
var inquirer = require('inquirer')
var axios = require('axios')




const questions = [
    { type: 'input', message: "What is your Github username?", name: "github_username" },
    { type: 'input', message: "What is your Github email?", name: "email" },
    { type: 'input', message: "What is your project title?", name: "title" },
    { type: 'input', message: "Give a concise description of your project", name: "description" },
    { type: 'input', message: "Give instructions for installation so that a developer can work on this project", name: "installation" },
    { type: 'input', message: "Give any instructions on how the repository should be used:", name: "usage" },
    { type: 'input', message: "Give instructions for how developers can contribute to this repository:", name: "contributions" },
    { type: 'input', message: "How can developers access tests for this application?", name: "tests" },
    { type: 'input', message: "How and to where should questions about development be directed?", name: "questions" },
    { type: 'list', message: "Choose a license:", choices: ['MIT', "Apache", "GPLv2", "Other", "None"], name: "license" }

];


function writeToFile(fileName, data) {
    var markdown = generateMarkdown(data);
    fs.writeFile(fileName, markdown, function (err) {
        if (err) {
            throw err
        }
        else {
            console.log(`ReadMe file successfully generated as ${fileName}`);
        }
    })
};


function init() {

    inquirer
        .prompt(questions)
        .then(async function (response) {
            try {
                var prompt_data = response
                if (prompt_data.license === "Other") {
                    const { license } = await inquirer.prompt({ type: 'input', message: "Which license are you using:", name: "license" });
                    prompt_data.license = license
                    prompt_data.license = `This project was completed under the ${prompt_data.license} license.`
                }

                else if (prompt_data.license === "None") {
                    prompt_data.license = "This project is not under any license."
                }

                else {
                    prompt_data.license = `This project was completed under the ${prompt_data.license} license.`
                }

                const { siteDeployed }  = await inquirer.prompt({ type: 'list', message: "Do you have a link for your deployed application?:", choices: ['yes', 'no'], name: "siteDeployed" });
                if (siteDeployed === 'yes') {
                    const {site_url} = await inquirer.prompt({ type: 'input', message: "What is the url of your deployed application", name: "site_url"});
                    prompt_data.deployed_info1 = `[![Website #](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](#)`
                    prompt_data.deployed_info2 = `See the deployed site at ${site_url}`
                }

                else {
                    prompt_data.deployed_info1 = "There is currently no deployed info for this site."
                    prompt_data.deployed_info2 = ""
                }
                
                axios.get(`https://api.github.com/users/${prompt_data.github_username}`).then(function (response) {
                    prompt_data.profile_pic = response.data.avatar_url
                    writeToFile('README.md', prompt_data)

                })
            } catch (err) {
                console.log(err)
            }
        });
    }

init()
