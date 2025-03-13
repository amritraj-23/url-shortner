require('dotenv').config({ path: '.env.test' });

// Set test timeout
jest.setTimeout(30000);

// Clean up function after all tests
afterAll(async () => {
  // Add cleanup logic here if needed
  // For example, closing database connections
}); 