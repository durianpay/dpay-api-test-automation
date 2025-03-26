const AuthPage = require('../../pages/access-token-b2b.page');
const BalancePage = require('../../pages/balance-inquiry.page');
const config = require('../../config');
const balanceData = require('../../fixtures/balance-inquiry.data');

describe('Balance Inquiry', () => {
    beforeAll(async () => {
        if (!config.accessToken) {
            await AuthPage.getAccessToken();
        }
    });

    it('should get balance successfully with valid account', async () => {
        const response = await BalancePage.getBalance(balanceData.balance.validAccount);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.accountInfos[0].availableBalance.value).toBeDefined();
        expect(typeof response.body.accountInfos[0].availableBalance.value).toBe('string');
    });

    it('should handle invalid account number', async () => {
        const response = await BalancePage.getBalance(balanceData.balance.invalidAccount);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should handle empty account number', async () => {
        const response = await BalancePage.getBalance(balanceData.balance.emptyAccount);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.responseMessage).toBe('Invalid Mandatory Field accountNo');
    });
}); 