const fs = require('fs').promises;
const path = require('path');

// Function to read Data.txt file
async function readDataFile() {
    try {
        const filePath = path.join(__dirname, 'Data.txt');
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

// Export the function
module.exports = { readDataFile };