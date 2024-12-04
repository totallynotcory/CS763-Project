export function validatePasswordResetForm(formData) {
  const { email } = formData;

  // Checking there is input data
  if (!email) {
    console.log('Form field(s) missing')  
    return false;
  }

  // Email format validation:
  // Checking email starts with 1+ alphanumeric characters, "." or "-" followed by an "@"
  // followed by 1+ alphanumeric characters or hyphens (domain) followed by a "."
  // ending with 2 to 4 characters (top-level domain)
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email format')
    return false;
  }

  // If all validations pass
  return true;
}
