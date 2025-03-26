// config.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const config = {
    baseUrl: process.env.BASE_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    privateKey: fs.readFileSync(path.resolve(__dirname, process.env.PRIVATE_KEY), 'utf8'),
    accessToken: null,
    balanceChannelId: process.env.CHANNEL_ID,
};

module.exports = config;