const express = require('express');
const os = require('os');
const dns = require('dns');
const { readDataFile } = require('./read.js');

const app = express();
const PORT = 3000;


app.get('/test', (req, res) => {
    res.send('Test route is working!');
});


app.get('/readfile', async (req, res) => {
    try {
        const fileContent = await readDataFile();
        res.send(fileContent);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/systemdetails', (req, res) => {
    try {
       
        const bytesToGB = (bytes) => {
            return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
        };

        const systemDetails = {
            platform: os.platform(),
            totalMemory: bytesToGB(os.totalmem()),
            freeMemory: bytesToGB(os.freemem()),
            cpuModel: os.cpus()[0].model.trim(),
            architecture: os.arch(),
            hostname: os.hostname(),
            uptime: Math.floor(os.uptime() / 60) + ' minutes'
        };

        res.json(systemDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/getip', (req, res) => {
    const hostname = 'masaischool.com';
    
    dns.resolve4(hostname, (error, addresses) => {
        if (error) {
            return res.status(500).json({ 
                error: `DNS resolution failed: ${error.message}` 
            });
        }
        
        res.json({
            hostname: hostname,
            ipAddress: addresses[0],
            allAddresses: addresses
        });
    });
});


app.use('*', (req, res) => {
    res.status(404).send('Route not found');
});


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log(`  GET http://localhost:${PORT}/test`);
    console.log(`  GET http://localhost:${PORT}/readfile`);
    console.log(`  GET http://localhost:${PORT}/systemdetails`);
    console.log(`  GET http://localhost:${PORT}/getip`);
});


process.on('SIGINT', () => {
    console.log('\nServer shutting down gracefully...');
    process.exit(0);
});