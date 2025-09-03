// Import the boxen module
const boxen = require('boxen');

// Define the message and title
const message = "I am using my first external module!";
const title = "Hurray!!!";

// Style 1: Classic (default style)
const classicBox = boxen(message, {
    title: title,
    titleAlignment: 'center',
    borderStyle: 'classic',
    padding: 1,
    margin: 1
});

console.log("Classic Style:");
console.log(classicBox);
console.log("\n"); // Add some space between boxes

// Style 2: SingleDouble (mixed single and double borders)
const singleDoubleBox = boxen(message, {
    title: title,
    titleAlignment: 'center',
    borderStyle: 'singleDouble',
    padding: 1,
    margin: 1
});

console.log("SingleDouble Style:");
console.log(singleDoubleBox);
console.log("\n");

// Style 3: Round (rounded corners)
const roundBox = boxen(message, {
    title: title,
    titleAlignment: 'center',
    borderStyle: 'round',
    padding: 1,
    margin: 1
});

console.log("Round Style:");
console.log(roundBox);