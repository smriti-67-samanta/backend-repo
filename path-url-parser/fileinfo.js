const path = require('path');


function parseFilePath(filePath) {
    try {
       
        if (!filePath || typeof filePath !== 'string') {
            throw new Error('Invalid file path provided');
        }

       
        const parsedPath = path.parse(filePath);
        
        return {
            fileName: parsedPath.base,
            extension: parsedPath.ext,
            directory: parsedPath.dir || '.',
            fullPath: filePath,
            nameWithoutExtension: parsedPath.name
        };
    } catch (error) {
        throw new Error(`File path parsing error: ${error.message}`);
    }
}


module.exports = { parseFilePath };