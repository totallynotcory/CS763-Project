export function validateGoalForm(formData) {
    const { type, targetValue } = formData;

    if (typeof type !== 'string' || type.trim() === '') {
        console.log('Goal type is required and must be a non-empty string');
        return { isValid: false, message: 'Type is required and must be a non-empty string' };
    }

    // Convert targetValue to a number
    const numericValue = Number(targetValue);

    if (typeof numericValue !== 'number' || isNaN(numericValue) || numericValue < 0) {
        console.log('Target value must be a valid number greater than or equal to zero');
        return { isValid: false, message: 'Target value must be a valid number greater than or equal to zero' };
    }

    // Limit goals to not exceed the amount of time in a day
    if (type == 'sleep' & numericValue > 24) {
        console.log('Sleep goal cannot exceed 24 hours');
        return { isValid: false, message: 'Sleep goal cannot exceed 24 hours' };
    }

    if (type == 'exercise' & numericValue > 1440) {
        console.log('Exercise goal cannot exceed 1440 minutes');
        return { isValid: false, message: 'Exercise goal cannot exceed 1440 minutes (number of minutes in a day)' }; 
    }

    // If all validations pass
    return { isValid: true, message: 'Form is valid' };
}