const crypto = require('crypto');
const config = require('../config');

function generateXSignature(method, path, token, requestBody, timestamp) {
    try {
        // Convert request body to string and hash it
        let requestBodyString = '';
        if (requestBody) {
            requestBodyString = JSON.stringify(requestBody);
        }
        const hash = crypto.createHash('sha256').update(requestBodyString).digest('hex');

        // Create string to sign
        const stringToSign = `${method}:${path}:${token}:${hash}:${timestamp}`;
        // console.log('String to Sign:', stringToSign);

        // Generate signature using HMAC-SHA512
        const hmac = crypto.createHmac('sha512', config.clientSecret);
        hmac.update(stringToSign);
        const signature = hmac.digest('base64');
        // console.log('Generated Signature:', signature);
        return signature;
    } catch (error) {
        console.error('Error generating signature:', error.message);
        throw new Error('Failed to generate signature');
    }
}

function generateAuthSignature(timestamp) {
    try {
        // Create string to sign for auth
        const stringToSign = `${config.clientId}|${timestamp}`;

        // Generate signature using private key
        const sign = crypto.createSign('SHA256');
        sign.update(stringToSign);
        const signature = sign.sign(config.privateKey, 'base64');
        // console.log('Generated Auth Signature:', signature);
        return signature;
    } catch (error) {
        // console.error('Error generating auth signature:', error.message);
        throw new Error('Failed to generate auth signature');
    }
}

function generateTimestamp() {
    const date = new Date();
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = (num) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        '.' + date.getMilliseconds() +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

module.exports = { 
    generateXSignature,
    generateAuthSignature,
    generateTimestamp
};
