const BasePage = require('./base.page');
const config = require('../config');
const { generateXSignature, generateTimestamp } = require('../utils/signature');
const balanceInquiryData = require('../fixtures/balance-inquiry.data');

class BalanceInquiryPage extends BasePage {
    async getBalance(accountNo) {
        const path = balanceInquiryData.balance.path;
        const timestamp = generateTimestamp();
        const signature = generateXSignature('POST', path, config.accessToken, { accountNo }, timestamp);

        const headers = {
            'Authorization': `Bearer ${config.accessToken}`,
            'X-PARTNER-ID': config.clientId,
            'X-EXTERNAL-ID': this.generateExternalId(),
            'CHANNEL-ID': config.balanceChannelId,
            'X-TIMESTAMP': timestamp,
            'X-SIGNATURE': signature
        };

        const data = {
            accountNo: accountNo
        };

        return await this.sendRequest('POST', path, headers, data);
    }
}

module.exports = new BalanceInquiryPage(); 