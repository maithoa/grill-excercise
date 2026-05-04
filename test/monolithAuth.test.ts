import { MonolithAuthService } from '../src/monolithAuth';

function runTests (){
    const authService = new MonolithAuthService();
    console.log('🚀Start testing for the MonolithAuthService...');

    // Test case 1: Valid internal user credentials
    const internalAuthResult = authService.authenticateInternal('admin', '123');
    console.assert(internalAuthResult.success === true, '❌ Test Case 1 Failed: User with valid credentials should be authenticated successfully.');
    console.log('✅ Test Case 1 - Valid Internal User:', internalAuthResult);

    // Test case 2: Invalid internal user credentials
    const invalidInternalAuthResult = authService.authenticateInternal('admin', 'wrongpassword');
    console.assert(invalidInternalAuthResult.success === false, '❌ Test Case 2 Failed: User with invalid credentials should not be authenticated.');
    console.log('✅ Test Case 2 - Invalid Internal User:', invalidInternalAuthResult);

    // Test case 3: Valid customer credentials
    const customerAuthResult = authService.authenticateCustomer('customer@gmail.com', '9999');
    console.assert(customerAuthResult.success === true, '❌ Test Case 3 Failed: Customer with valid credentials should be authenticated successfully.');
    console.log('✅ Test Case 3 - Valid Customer:', customerAuthResult);

    // Test case 4: Invalid customer credentials
    const invalidCustomerAuthResult = authService.authenticateCustomer('customer@gmail.com', '0000');
    console.assert(invalidCustomerAuthResult.success === false, '❌ Test Case 4 Failed: Customer with invalid credentials should not be authenticated.');
    console.log('✅ Test Case 4 - Invalid Customer:', invalidCustomerAuthResult);

}

runTests();


// Grill: 
// This is not working if we want to test the case that we loose connection to database or timeout 
// If I want to load test 100000 users it is quite hard to do with this approach, I will need to mock the database connection and simulate the load test with a tool like JMeter or Artillery.
// If I want to test the notifications after 3 times failed login attempts, I will need to mock the notification service and verify that the notification is sent after 3 failed attempts.
