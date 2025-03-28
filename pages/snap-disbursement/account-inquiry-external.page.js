const BasePage = require('../../pages/base.page');
const config = require('../../config');
const accountInquiryExternalData = require('../../fixtures/snap-disbursement/account-inquiry-external.data');
const { generateXSignature, generateTimestamp } = require('../../utils/signature');

class AccountInquiryExternalPage extends BasePage {
    async getAccountInquiry(accountNo, bankCode, xExternalId) {
        const path = accountInquiryExternalData.account.path;
        const timestamp = generateTimestamp();
        const data = {
            beneficiaryAccountNo: accountNo,
            beneficiaryBankCode: bankCode
        };
        const signature = generateXSignature('POST', path, config.accessToken, data, timestamp);

        const headers = {
            'Authorization': `Bearer ${config.accessToken}`,
            'X-PARTNER-ID': config.clientId,
            'X-EXTERNAL-ID': xExternalId,
            'CHANNEL-ID': config.balanceChannelId,
            'X-TIMESTAMP': timestamp,
            'X-SIGNATURE': signature
        };

        const response = await this.sendRequest('POST', path, headers, data);

        return response;
    }
}

module.exports = AccountInquiryExternalPage; 