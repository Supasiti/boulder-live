const fs = require('fs');
const util = require('util');


//  read from file
const readFromFile = util.promisify(fs.readFile);


// write to file
const writeToFile = (filePath, content) => {
  const toWrite = JSON.stringify(content, null, 2);

  fs.writeFile(filePath, toWrite, (err) =>
    err ? console.error(err) : console.info(`\nData written to ${filePath}`)
  );
};

module.exports = {
  readFromFile,
  writeToFile
}