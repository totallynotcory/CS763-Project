import { validateRegistrationForm } from '../utils/validateRegistrationForm'; 

test('empty input form fields', () => {
    const formData = { name: '', email: 'test@example.com', passwordHashed: 'password123' };
    const result = validateRegistrationForm(formData);
    expect(result).toBe(false);
});

test('email missing @', () => {
    const formData = { name: 'Test', email: 'testexample.com', passwordHashed: 'password123' };
    const result = validateRegistrationForm(formData);
    expect(result).toBe(false);
});

test('email missing last part of domain', () => {
    const formData = { name: 'Test', email: 'test@example', passwordHashed: 'password123' };
    const result = validateRegistrationForm(formData);
    expect(result).toBe(false);
});

test('email missing first part of domain', () => {
    const formData = { name: 'Test', email: 'test@.com', passwordHashed: 'password123' };
    const result = validateRegistrationForm(formData);
    expect(result).toBe(false);
});

test('valid input form fields', () => {
    const formData = { name: 'Valid Test', email: 'test@gmail.com', passwordHashed: 'password123' };
    const result = validateRegistrationForm(formData);
    expect(result).toBe(true);
});
