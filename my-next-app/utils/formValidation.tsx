import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

//Custom hooks for login form validation
export const useLoginForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  //function to validate login form data
const validateLoginForm = (formData: { email: string; password: string }): FormErrors => {
    const errors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return { errors, validateLoginForm };
};

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { validateLoginForm };
export default useLoginForm; // Exporting useLoginForm as default



