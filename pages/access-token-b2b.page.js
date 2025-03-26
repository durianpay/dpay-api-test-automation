// pages/auth.page.js
const config = require('../config');
const authData = require('../fixtures/access-token-b2b.data');
const BasePage = require('./base.page');
const { generateAuthSignature, generateTimestamp } = require('../utils/signature');

class AccessTokenB2BPage extends BasePage {
    async getAccessToken() {
        const path = authData.auth.path;
        const timestamp = generateTimestamp();
        const signature = generateAuthSignature(timestamp);

            const headers = {
                'X-CLIENT-KEY': config.clientId,
                'X-EXTERNAL-ID': this.generateExternalId(),
                'X-SIGNATURE': signature,
                'X-TIMESTAMP': timestamp,
            };

            const data = {
                grantType: authData.auth.grantType
            };

            const response = await this.sendRequest('POST', path, headers, data);
            config.accessToken = response.body.accessToken;

            return response;
    }
}

module.exports = new AccessTokenB2BPage();