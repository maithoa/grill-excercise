import { CustomerAuthProvider } from '../src/improve/CustomerAuthProvider';

describe('CustomerAuthProvider', () => {
    let provider: CustomerAuthProvider;

    beforeEach(() => {
        provider = new CustomerAuthProvider();
    });

    it('should return correct provider type', () => {
        expect(provider.getType()).toBe('Customer');
    });

    describe('verify', () => {
        it('should return true for valid customer credentials', async () => {
            const result = await provider.verify('customer@example.com', '456');
            expect(result).toBe(true);
        });

        it('should return false for invalid customer email', async () => {
            const result = await provider.verify('wrong@example.com', '456');
            expect(result).toBe(false);
        });

        it('should return false for invalid customer password', async () => {
            const result = await provider.verify('customer@example.com', 'wrongpassword');
            expect(result).toBe(false);
        });
    });
});
