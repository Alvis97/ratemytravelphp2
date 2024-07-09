import React, { useState } from 'react';
import { validateLoginForm } from "../utils/formValidation";
import formStyle from '../styles/components/formStyle.module.scss';
import { useRouter } from 'next/router';

// Define FormErrors interface here or in formValidation.tsx if used there as well
interface FormErrors {
  email?: string;
  password?: string;
  form?: string; // Add form property here
}

interface LoginFormProps {
    closeModal: () => void; // Define the type for closeModal prop
  }

const LoginForm: React.FC<LoginFormProps> = ({ closeModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginSuccess, setLoginSuccess] = useState(false); // State to manage login success
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/logIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Login successful:', data);
          setLoginSuccess(true); 
           // Close the modal
           closeModal();
          router.push('/success');
          // Set login success state to true
        } else {
          console.error('Login failed:', data);
          setErrors({ ...errors, form: 'Login failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ ...errors, form: 'An unexpected error occurred. Please try again.' });
      }
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
      <button type="submit" className={formStyle.CFAButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;



function closeModal() {
    throw new Error('Function not implemented.');
}

