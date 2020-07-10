function generateMarkdown(data) {
  return `
# ${data.title}

## Description

${data.description}

## Deployed Site

${data.deployed_info1}

${data.deployed_info2}

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [Github Information](#github-information)


## Installation

${data.installation}

## Usage

${data.usage}

## License

${data.license}

## Contributing

${data.contributions}

## Tests

${data.tests}

## Questions

${data.questions}

## Github Information

[![Generic badge](https://img.shields.io/badge/${data.github_username}-Github_Profile-green.svg)](https://github.com/${data.github_username})

![Github Profile](${data.profile_pic})

Email: ${data.email}
`;
}

module.exports = generateMarkdown;
