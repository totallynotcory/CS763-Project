import apiClient from '../services/apiClient.js'

// To be deleted later
test('simple math test', () => {
    expect(1 + 1).toBe(2);
  });
  
test('simple math test 2', () => {
    expect(1 + 1).toBe(3); // expected fail
});

//tests
test('test connection to server', async () => {
  const response = await apiClient.get('/check-connection');
  expect(response.status).toBe(200);
})