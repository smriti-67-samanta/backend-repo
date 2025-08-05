const express = require('express');
const rateLimit = require('express-rate-limit');
const apiRouter = require('./routes/api');

const app = express();


app.use('/api', apiRouter);


app.use('*', (req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});