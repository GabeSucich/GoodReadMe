function generateMarkdown(data) {
  return `
# ${data.title}

## Description

${data.description}

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


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

![Github Profile](${data.profile_pic})

Email: ${data.email}
`;
}

module.exports = generateMarkdown;
