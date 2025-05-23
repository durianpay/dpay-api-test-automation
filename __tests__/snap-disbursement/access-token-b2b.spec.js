// __tests__/integration/auth.spec.js
const AuthPage = require('../../pages/snap-disbursement/access-token-b2b.page');
const authData = require('../../fixtures/snap-disbursement/access-token-b2b.data');      
describe('Access Token B2B @snap-disbursement @disbursement_service', () => {
    beforeAll(async () => {
        // Initialize setup if needed
    });

    it('should get access @token successfully', async () => {
        const response = await AuthPage.getAccessToken();
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.accessToken).toBeDefined();
        expect(typeof response.body.accessToken).toBe('string');
        expect(response.body.tokenType).toBe('BearerToken');
        expect(response.body.expiresIn).toBeDefined();
    });
});