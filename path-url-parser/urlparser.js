const url = require('url');


function parseUrl(fullUrl) {
    try {
       
        if (!fullUrl || typeof fullUrl !== 'string') {
            throw new Error('Invalid URL provided');
        }

       
        const parsedUrl = new URL(fullUrl);
        
        
        const queryParams = {};
        parsedUrl.searchParams.forEach((value, key) => {
            queryParams[key] = value;
        });

        return {
            hostname: parsedUrl.hostname,
            pathname: parsedUrl.pathname,
            protocol: parsedUrl.protocol,
            port: parsedUrl.port || 'default',
            query: queryParams,
            fullUrl: fullUrl
        };
    } catch (error) {
        throw new Error(`URL parsing error: ${error.message}`);
    }
}


module.exports = { parseUrl };