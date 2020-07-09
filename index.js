const generateMarkdown = require("./utils/generateMarkdown");
var fs = require('fs')
var inquirer = require('inquirer')
var axios = require('axios')

axios.get("https://api.github.com/users/GabeSucich").then(function(response) {console.log(response)})


const questions = [
    {type: 'input',  message:"What is your Github username?", name: "github_username"},
    {type: 'input',  message:"What is your Github email?", name: "email"},
    {type: 'input',  message:"What is your project title?", name: "title"},
    {type: 'input',  message:"Give a concise description of your project", name: "description"},
    {type: 'input',  message:"Give the exact name of your project Github repository:", name: "repo_name"},
    {type: 'input', message: "Give instructions for installation so that a developer can work on this project", name: "installation"},
    {type: 'input',  message:"Give any instructions on how the repository should be used:", name: "usage"},
    {type: 'input', message:"Give instructions for how developers can contribute to this repository:", name: "contributions"},
    {type: 'list',  message:"Choose a license:", choices: ['MIT', "Apache", "GPLv2", "None"], name: "license"},
    {type: 'input',  message:"How can developers access tests for this application?", name: "tests"},
    {type: 'input',  message:"How and to where should questions about development be directed?", name: "questions"}

];


function writeToFile(fileName, data) {
    console.log(data.yes)
    var markdown = generateMarkdown(data);
    fs.writeFile(fileName, markdown, function(err) {
        if (err) {
            throw err
        }
        else {
            console.log(`ReadMe file successfully generated as ${fileName}`);
        }
    })
};

async function photo(username) {

}

function init() {
    inquirer
        .prompt(questions).then(function(response) {


            writeToFile('README.md', response)
        })
};

init();
