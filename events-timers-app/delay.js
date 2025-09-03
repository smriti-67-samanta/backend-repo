const { setTimeout } = require('timers/promises');


async function delayedMessage(message, delayMs) {
    try {
      
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message provided');
        }

        if (!delayMs || typeof delayMs !== 'number' || delayMs < 0) {
            throw new Error('Invalid delay time provided. Must be a positive number.');
        }

        if (delayMs > 30000) { 
            throw new Error('Delay time cannot exceed 30 seconds');
        }

        console.log(`[DELAY START] Waiting for ${delayMs}ms with message: "${message}"`);

        await setTimeout(delayMs);

        console.log(`[DELAY COMPLETE] ${delayMs}ms elapsed`);

        return {
            message: message,
            delay: `${delayMs}ms`,
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        throw new Error(`Delay error: ${error.message}`);
    }
}

function delayedMessageWithPromise(message, delayMs) {
    return new Promise((resolve, reject) => {
        // Validate inputs
        if (!message || typeof message !== 'string') {
            reject(new Error('Invalid message provided'));
            return;
        }

        if (!delayMs || typeof delayMs !== 'number' || delayMs < 0) {
            reject(new Error('Invalid delay time provided. Must be a positive number.'));
            return;
        }

        if (delayMs > 30000) {
            reject(new Error('Delay time cannot exceed 30 seconds'));
            return;
        }

        console.log(`[DELAY START] Waiting for ${delayMs}ms with message: "${message}"`);

        setTimeout(() => {
            console.log(`[DELAY COMPLETE] ${delayMs}ms elapsed`);
            resolve({
                message: message,
                delay: `${delayMs}ms`,
                timestamp: new Date().toISOString()
            });
        }, delayMs);
    });
}


module.exports = { delayedMessage, delayedMessageWithPromise };