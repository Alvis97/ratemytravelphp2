import { useState } from "react";

interface FormErrors {
    email?: string;
    password?: string;
}

const [errors, setErrors] = useState<FormErrors>({});

export const validateLoginForm = (formData: { email: string; password: string }): FormErrors => {
  const errors: FormErrors = {};

  //email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email format";
  }

  //Password validation
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "password must be at least 6 characters long";
  }

  return errors;
};

//Helper function to validate email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};