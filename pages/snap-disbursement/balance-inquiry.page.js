const BasePage = require('../../pages/base.page');
const config = require('../../config');
const { generateXSignature, generateTimestamp } = require('../../utils/signature');
const balanceInquiryData = require('../../fixtures/snap-disbursement/balance-inquiry.data');

class BalanceInquiryPage extends BasePage {
    async getBalance(accountNo) {
        const path = balanceInquiryData.balance.path;
        const timestamp = generateTimestamp();
        const data = { accountNo };
        const signature = generateXSignature('POST', path, config.accessToken, data, timestamp);

        const headers = {
            'Authorization': `Bearer ${config.accessToken}`,
            'X-PARTNER-ID': config.clientId,
            'X-EXTERNAL-ID': this.generateExternalId(),
            'CHANNEL-ID': config.balanceChannelId,
            'X-TIMESTAMP': timestamp,
            'X-SIGNATURE': signature
        };

        const response = await this.sendRequest('POST', path, headers, data);

        return response;
    }
}

module.exports = BalanceInquiryPage; 