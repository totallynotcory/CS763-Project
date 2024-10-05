import apiClient from '../services/apiClient.js'
import { render, screen } from '@testing-library/react';
import App from '../App';

// To be deleted later
// test('simple math test', () => {
//     expect(1 + 1).toBe(2);
//   });
  
// test('simple math test 2', () => {
//     expect(1 + 1).toBe(3); // expected fail
// });

// tests
// test('test connection to server', async () => {
//   const response = await apiClient.get('/check-connection');
//   expect(response.status).toBe(200);
// })

test('renders home text', () => {
  render(<App />);
  const homeElement = screen.getByText(/welcome to the home page/i); // case-insensitive due to the regular expression /i
  expect(homeElement).toBeInTheDocument();
});
