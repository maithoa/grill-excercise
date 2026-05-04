import { InternalAuthProvider } from '../src/improve/InternalAuthProvider';

describe('InternalAuthProvider', () => {
    let provider: InternalAuthProvider;

    beforeEach(() => {
        provider = new InternalAuthProvider();
    });

    it('should return correct provider type', () => {
        expect(provider.getType()).toBe('Internal');
    });

    describe('verify', () => {
        it('should return true for valid internal user credentials', async () => {
            const result = await provider.verify('admin', '123');
            expect(result).toBe(true);
        });

        it('should return false for invalid internal username', async () => {
            const result = await provider.verify('wrongadmin', '123');
            expect(result).toBe(false);
        });

        it('should return false for invalid internal password', async () => {
            const result = await provider.verify('admin', 'wrongpassword');
            expect(result).toBe(false);
        });
    });
});
