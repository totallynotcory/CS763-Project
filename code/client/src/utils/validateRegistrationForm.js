export function validateRegistrationForm(formData) {
    const { name, email, passwordHashed } = formData;

    // Checking input data in each field
    if (!name || !email || !passwordHashed) {
      console.log('Form field(s) missing')  
      return false;
    }
  
    // Email format validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format')
      return false;
    }
  
    // If all validations pass
    return true;
  }
