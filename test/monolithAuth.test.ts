import { MonolithAuthService } from '../src/monolithAuth';

describe('MonolithAuthService', () => {
    let authService: MonolithAuthService;

    beforeEach(() => {
        authService = new MonolithAuthService();
    });

    describe('authenticateInternal', () => {
        it('should authenticate user with valid credentials successfully (Test Case 1)', () => {
            const result = authService.authenticateInternal('admin', '123');
            expect(result).toEqual({ success: true, role: 'internal' });
        });

        it('should fail to authenticate user with invalid credentials (Test Case 2)', () => {
            const result = authService.authenticateInternal('admin', 'wrongpassword');
            expect(result).toEqual({ success: false, message: 'Invalid credentials' });
        });

        it('should fail to authenticate user with unknown username', () => {
            const result = authService.authenticateInternal('unknown', '123');
            expect(result).toEqual({ success: false, message: 'Invalid credentials' });
        });
    });

    describe('authenticateCustomer', () => {
        it('should authenticate customer with valid credentials successfully (Test Case 3)', () => {
            const result = authService.authenticateCustomer('customer@gmail.com', '9999');
            expect(result).toEqual({ success: true, id: 101 });
        });

        it('should fail to authenticate customer with invalid pin', () => {
            const result = authService.authenticateCustomer('customer@gmail.com', 'wrongpin');
            expect(result).toEqual({ success: false, message: 'Invalid credentials' });
        });

        it('should fail to authenticate customer with unknown email', () => {
            const result = authService.authenticateCustomer('unknown@gmail.com', '9999');
            expect(result).toEqual({ success: false, message: 'Invalid credentials' });
        });
    });
});
