// move, rename, add GPS metadata & create destination folders for images

// import libraries
const fs = require('fs-extra');

// import local modules
const processFiles = require('./modules/process-files');

// variables
const csvPath = './data/LMI-B_last.csv';

// ////////////////////////////////////////////////////////////////////////////
// // METHODS

// /////////////////////////////////////////////////////////////////////
// load csv file
function readCSV (filePath, delimiter) {
  // if file is found in path
  if (fs.existsSync(filePath)) {
    // return parsed file
    const newArray = fs.readFileSync(filePath, 'utf8').split('\n');
    return newArray.filter(line => line).map(line => line.split(delimiter || ','));
  };
  // else return empty object
  console.log('\x1b[31m%s\x1b[0m', `ERROR: ${filePath} file NOT found!`);
  return [];
};

// ////////////////////////////////////////////////////////////////////////////
// // MAIN function
function main () {

  // help text
  const helpText = `\n Available commands:\n\n\
  1. -h : display help text\n\
  2. -paf [input/path] [output/path] [userName]: process all image files. All arguments are required.\n\
  3. -mf : copy & rename files from given inFolder to given outFolder\n`;

  // get command line arguments
  const arguments = process.argv;
  console.log('\x1b[34m%s\x1b[0m', '\n@START: CLI arguments >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.table(arguments);
  console.log('\n');

  // get third command line argument
  // if third argument is missing, -h is set by default
  const mainArg = process.argv[2] || '-h';
  // get the rest of the arguments
  const inPathArg = process.argv[3];
  const outPathArg = process.argv[4];
  const userName = process.argv[5];

  // run requested command
  // 1. if argument is 'h' or 'help' print available commands
  if (mainArg === '-h') {
    console.log(helpText);

    // 2. else if argument is 'pf'
  } else if (mainArg === '-paf') {
    // process all image files
    console.log('\x1b[34m%s\x1b[0m', '\nProcess image files');

    // read monuments list - including header
    monArr = readCSV(csvPath, ';');
    console.log(`Monuments Array: ${monArr.length} items\n`);

    // check in and out path arguments
    if (fs.pathExistsSync(inPathArg) && fs.pathExistsSync(outPathArg)) {
      if (userName) {
        // process files in array
        processFiles(inPathArg, outPathArg, userName, monArr.slice(1));
      } else {
        console.log(`ERR: userName is missing or invalid!`);
      }

      // if path args are invalid or missing print error msg
    } else {
      console.log(`ERR: input path and/or output path is missing or invalid!`);
    };

    // 3. else if argument is 'mf'
  } else if (mainArg === '-mf') {
    // copy & rename & add GPS cdd to new file
    console.log('\x1b[34m%s\x1b[0m', '\nCopy & rename image files');

    // else print help
  } else {
    console.log(helpText);
  }

}


// ////////////////////////////////////////////////////////////////////////////
// // MAIN
main();