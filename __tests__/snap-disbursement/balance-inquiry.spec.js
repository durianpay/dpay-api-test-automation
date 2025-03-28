const AuthPage = require('../../pages/snap-disbursement/access-token-b2b.page');
const BalanceInquiryPage = require('../../pages/snap-disbursement/balance-inquiry.page');
const config = require('../../config');
const balanceData = require('../../fixtures/snap-disbursement/balance-inquiry.data');

describe('Balance Inquiry', () => {
    let balancePage;

    beforeAll(async () => {
        if (!config.accessToken) {
            await AuthPage.getAccessToken();
        }
        balancePage = new BalanceInquiryPage();
    });

    it('should get balance successfully with valid account', async () => {
        const response = await balancePage.getBalance(balanceData.balance.validAccount);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.accountInfos[0].availableBalance.value).toBeDefined();
        expect(typeof response.body.accountInfos[0].availableBalance.value).toBe('string');
    });

    it('should handle invalid account number', async () => {
        const response = await balancePage.getBalance(balanceData.balance.invalidAccount);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should handle empty account number', async () => {
        const response = await balancePage.getBalance(balanceData.balance.emptyAccount);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.responseMessage).toBe('Invalid Mandatory Field accountNo');
    });
}); 