// Mock the database connection and user data for testing purposes
const USERS_TABLE = [{ id: 1, username: 'admin', password: '123', role: 'internal' }];
const CUSTOMERS_TABLE = [{ id: 101, email: 'customer@gmail.com', pin: '9999' }];

export class MonolithAuthService {
    // Simulate user authentication for internal users
    authenticateInternal(username: string, password: string) {
        const user = USERS_TABLE.find(u => u.username === username && u.password === password);
        if (user) {
            return { success: true, role: user.role };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    // Simulate user authentication for customers
    authenticateCustomer(email: string, pin: string) {
        const customer = CUSTOMERS_TABLE.find(c => c.email === email && c.pin === pin);
        if (customer) {
            return { success: true, id: customer.id };
        }
        return { success: false, message: 'Invalid credentials' };
    }
}