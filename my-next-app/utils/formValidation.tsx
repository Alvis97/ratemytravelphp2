export interface FormErrors {
  [key: string]: string | undefined;
}

interface SignUpFormData {
  fName: string;
  lName: string;
  age: string;
  gender: string;
  email: string;
  pwd: string;
  //avatar: string;
}

export interface SignUpFormErrors extends FormErrors {
  fName?: string;
  lName?: string;
  age?: string;
  gender?: string;
  //avatar?: string;
  email?: string;
  pwd?: string;
}


// Function to validate sign-up form data
export const validateSignUpForm = (formData: SignUpFormData): SignUpFormErrors => {
  const errors: SignUpFormErrors = {};

  // First Name validation
  if (!formData.fName.trim()) {
    errors.fName = "First name is required";
  } else if (isValidFName(formData.fName)) {
    errors.fName = "Names can only be letters";
  }

  // Last Name validation
  if (!formData.lName.trim()) {
    errors.lName = "Last name is required";
  } else if (isValidLName(formData.lName)) {
    errors.lName = "Names can only be letters";
  }

  // Age validation
  if (!formData.age.trim()) {
    errors.age = "Age is required";
  } else if (!isPositiveInteger(formData.age)) {
    errors.age = "Age must be a number";
  }

  // Gender validation
  if (!formData.gender.trim()) {
    errors.gender = "Gender is required";
  }

  // Avatar validation
  //if (!formData.avatar.trim()) {
    //errors.avatar = "Avatar is required";
  //}

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!formData.pwd.trim()) {
    errors.pwd = "Password is required";
  } else if (formData.pwd.length < 6) {
    errors.pwd = "Password must be at least 6 characters long";
  }else if (!isValidPWD(formData.pwd)) {
    errors.pwd = "One uppercase, lowercase and number is needed";
  }

  return errors;
};

// Function to validate login form data
export const validateLoginForm = (formData: { email: string; password: string }): FormErrors => {
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

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidFName = (fName: string): boolean => {
  const fNameRegex = /^[Zz-]+50$/;
  return fNameRegex.test(fName);
}

const isValidLName = (lName: string): boolean => {
  const lNameRegex = /^[Zz-]+100$/
  return lNameRegex.test(lName);
}

const isValidPWD = (pwd: string): boolean => {
  const pwdRegex = /^(?=.*[Tt])(?=.*\d).{6,}$/
  return pwdRegex.test(pwd);
}

// Helper function to validate positive integer
const isPositiveInteger = (value: string): boolean => {
  const int = parseInt(value, 10);
  return !isNaN(int) && int > 0;
};
