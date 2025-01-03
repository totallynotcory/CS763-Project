export function validateDailyDataForm(formData) {
    const { weight, steps, sleep, water, exercise, entryDate } = formData;

    // Checking there is input data in each field
    if (!weight || !steps || !sleep || !water || !exercise || !entryDate) {
        return { isValid: false, message: 'Form field(s) missing' };
    }

    // Checking validity of integer inputs
    if (weight < 0 || steps < 0 || sleep < 0 || water < 0 || exercise < 0) {
        return { isValid: false, message: 'Inputs must be positive values' };
    }
    
    if (sleep > 24) {
        return { isValid: false, message: 'Sleep cannot exceed 24 hours' };
    }

    if (exercise > 1440) {
        return { isValid: false, message: 'Exercise cannot exceed 1440 minutes (number of minutes in a day)' }; 
    }

    // If all validations pass
    return { isValid: true, message: 'Form is valid' };
}
