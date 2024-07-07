import React, { useState } from 'react';
import { validateLoginForm } from '../utils/formValidation';
import navigationStyle from '../styles/navigation.module.scss';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form submission logic here (e.g., send data to server)
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has validation errors:', validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label><br />
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@hotmail.com"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="*********"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <button type="submit" className={navigationStyle.CFAButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;

interface FormErrors {
  email?: string;
  password?: string;
}


