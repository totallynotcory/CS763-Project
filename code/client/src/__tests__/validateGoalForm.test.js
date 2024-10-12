import { validateGoalForm } from '../utils/validateGoalForm';

// Invalid form tests
test('empty input form fields', () => {
    const formData = { type: '', targetValue: '' };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Type is required and must be a non-empty string' });
});

test('missing type field', () => {
    const formData = { targetValue: 100 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Type is required and must be a non-empty string' });
});

test('type field with non-string value', () => {
    const formData = { type: 123, targetValue: 100 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Type is required and must be a non-empty string' });
});

test('targetValue field with non-number value', () => {
    const formData = { type: 'weight', targetValue: 'invalid' };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Target value must be a valid number greater than or equal to zero' });
});

test('targetValue less than zero', () => {
    const formData = { type: 'weight', targetValue: -5 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Target value must be a valid number greater than or equal to zero' });
});

test('targetValue is NaN', () => {
    const formData = { type: 'weight', targetValue: NaN };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Target value must be a valid number greater than or equal to zero' });
});

test('sleep exceeds limits', () => {
    const formData = { type: 'sleep', targetValue: 25 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Sleep goal cannot exceed 24 hours' });
});

test('exercise exceeds limits', () => {
    const formData = { type: 'exercise', targetValue: 2000 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: false, message: 'Exercise goal cannot exceed 1440 minutes (number of minutes in a day)' });
});

// Valid form tests
test('valid form data', () => {
    const formData = { type: 'weight', targetValue: 10 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: true, message: 'Form is valid' });
});

test('targetValue is zero', () => {
    const formData = { type: 'weight', targetValue: 0 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: true, message: 'Form is valid' });
});

test('type field with leading/trailing spaces', () => {
    const formData = { type: '   weight  ', targetValue: 5 };
    const result = validateGoalForm(formData);
    expect(result).toEqual({ isValid: true, message: 'Form is valid' });
});
