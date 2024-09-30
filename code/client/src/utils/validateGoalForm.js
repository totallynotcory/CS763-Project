export function validateGoalForm(formData) {
    const { type, targetValue } = formData;

    // Validate 'type': should be a non-empty string
    if (typeof type !== 'string' || type.trim() === '') {
        console.log('Type is required and must be a non-empty string');
        return { isValid: false, message: 'Type is required and must be a non-empty string' };
    }

    // Validate 'targetValue': should be a number and greater than or equal to zero
    if (typeof targetValue !== 'number' || isNaN(targetValue) || targetValue < 0) {
        console.log('Target value must be a valid number greater than or equal to zero');
        return { isValid: false, message: 'Target value must be a valid number greater than or equal to zero' };
    }

    // If all validations pass
    return { isValid: true, message: 'Form is valid' };
}