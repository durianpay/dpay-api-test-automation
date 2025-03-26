const BasePage = require('./base.page');
const config = require('../config');
const accountInquiryExternalData = require('../fixtures/account-inquiry-external.data');
const { generateXSignature, generateTimestamp } = require('../utils/signature');

class AccountInquiryExternalPage extends BasePage {
    async getAccountInquiry(beneficiaryAccountNo, beneficiaryBankCode, xExternalId) {
        const path = accountInquiryExternalData.account.path;
        const timestamp = generateTimestamp();
        const signature = generateXSignature('POST', path, config.accessToken, { beneficiaryAccountNo, beneficiaryBankCode }, timestamp);

            const headers = {
                'Authorization': `Bearer ${config.accessToken}`,
                'X-PARTNER-ID': config.clientId,
                'X-EXTERNAL-ID': xExternalId,
                'CHANNEL-ID': config.balanceChannelId,
                'X-TIMESTAMP': timestamp,
                'X-SIGNATURE': signature
            };

            const data = {
                beneficiaryAccountNo: beneficiaryAccountNo,
                beneficiaryBankCode: beneficiaryBankCode,
            };

            const response = await this.sendRequest('POST', path, headers, data);

        return response;
    }
}

module.exports = new AccountInquiryExternalPage(); 