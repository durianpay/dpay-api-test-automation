const AuthPage = require('../../pages/access-token-b2b.page');
const AccountInquiryExternalPage = require('../../pages/account-inquiry-external.page');
const config = require('../../config');
const accountInquiryExternalData = require('../../fixtures/account-inquiry-external.data');

describe('Account Inquiry External', () => {
    beforeAll(async () => {
        if (!config.accessToken) {
            await AuthPage.getAccessToken();
        }
    });

    it('should get account inquiry successfully with valid account', async () => {
        const response = await AccountInquiryExternalPage.getAccountInquiry(accountInquiryExternalData.account.beneficiaryAccountNo, accountInquiryExternalData.account.beneficiaryBankCode, accountInquiryExternalData.account.xExternalId);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
}); 