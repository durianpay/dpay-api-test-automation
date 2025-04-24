const AuthPage = require('../../pages/snap-disbursement/access-token-b2b.page');
const AccountInquiryExternalPage = require('../../pages/snap-disbursement/account-inquiry-external.page');
const config = require('../../config');
const accountInquiryExternalData = require('../../fixtures/snap-disbursement/account-inquiry-external.data');

describe('Account Inquiry External', () => {
    let accountInquiryPage;

    beforeAll(async () => {
        if (!config.accessToken) {
            await AuthPage.getAccessToken();
        }
        accountInquiryPage = new AccountInquiryExternalPage();
    });

    it('should get account inquiry successfully with valid account', async () => {
        const response = await accountInquiryPage.getAccountInquiry(
            accountInquiryExternalData.account.beneficiaryAccountNo,
            accountInquiryExternalData.account.beneficiaryBankCode,
            accountInquiryExternalData.account.xExternalId
        );
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
}); 