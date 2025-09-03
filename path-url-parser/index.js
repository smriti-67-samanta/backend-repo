const express = require('express');
const { parseFilePath } = require('./fileinfo.js');
const { parseUrl } = require('./urlparser.js');

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));


app.get('/test', (req, res) => {
    res.send('Test route is working!');
});


app.get('/fileinfo', (req, res) => {
    try {
        const filePath = req.query.filepath;
        
        if (!filePath) {
            return res.status(400).json({
                error: 'filepath query parameter is required',
                example: '/fileinfo?filepath=folder/sample.txt'
            });
        }

        const fileInfo = parseFilePath(filePath);
        res.json(fileInfo);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/parseurl', (req, res) => {
    try {
        const urlToParse = req.query.url;
        
        if (!urlToParse) {
            return res.status(400).json({
                error: 'url query parameter is required',
                example: '/parseurl?url=https://example.com/path?param=value'
            });
        }

        const urlInfo = parseUrl(urlToParse);
        res.json(urlInfo);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Path and URL Parser API</h1>
        <h2>Available Routes:</h2>
        <ul>
            <li><strong>GET /test</strong> - Test route</li>
            <li><strong>GET /fileinfo?filepath=path/to/file.txt</strong> - Parse file path</li>
            <li><strong>GET /parseurl?url=https://example.com/path?param=value</strong> - Parse URL</li>
        </ul>
        <h2>Examples:</h2>
        <p>File Info: <a href="/fileinfo?filepath=folder/sample.txt">/fileinfo?filepath=folder/sample.txt</a></p>
        <p>URL Parse: <a href="/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks">/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks</a></p>
    `);
});


app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log(`  GET http://localhost:${PORT}/test`);
    console.log(`  GET http://localhost:${PORT}/fileinfo?filepath=folder/sample.txt`);
    console.log(`  GET http://localhost:${PORT}/parseurl?url=https://example.com/path?param=value`);
    console.log(`  GET http://localhost:${PORT}/`);
});


process.on('SIGINT', () => {
    console.log('\nServer shutting down gracefully...');
    process.exit(0);
});