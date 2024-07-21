// pages/auth/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { signIn } from 'next-auth/react';
import { validateSignUpForm, SignUpFormErrors } from '../utils/formValidation';

import formStyle from '../styles/pages/forms.module.scss';

const SignUp = () => {
  const router = useRouter();
  
  // Form data and errors state
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    age: '',
    gender: '',
    pronounce: '',
    email: '',
    pwd: '',
    avatar: '',
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle avatar selection change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatar(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Exit early if there are validation errors
    }

    // Include selected avatar in form data
    const formDataWithAvatar = {
      ...formData,
      avatar: selectedAvatar,
    };

    console.log('Submitting form data:', formDataWithAvatar);

    // Send form data to the server
    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithAvatar),
      });

      if (response.ok) {
        console.log('Sign-up successful');
        // After successful sign-up, you can call `signIn` to automatically log the user in
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.pwd,
        });

        if (result?.error) {
          setErrors({ ...errors, form: 'Sign-up successful but login failed.' });
        } else {
          router.push('/'); // Redirect to the home page on successful login
        }
      } else {
        throw new Error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({ ...errors, form: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <>
      <div className={formStyle.formDiv}>
        <h1 className={formStyle.h1}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fName">First Name</label><br />
          <input
            type="text"
            name="fName"
            id="fName"
            value={formData.fName}
            onChange={handleChange}
            placeholder="Sam"
          /><br />
          {errors.fName && <p className={formStyle.error}>{errors.fName}</p>}
          <label htmlFor="lName">Last Name</label><br />
          <input
            type="text"
            name="lName"
            id="lName"
            value={formData.lName}
            onChange={handleChange}
            placeholder="Borg"
          /><br />
          {errors.lName && <p className={formStyle.error}>{errors.lName}</p>}
          <label htmlFor="age">Age</label><br />
          <input
            type="text"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="22"
          /><br />
          {errors.age && <p className={formStyle.error}>{errors.age}</p>}
          <label htmlFor="gender">Gender</label><br />
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className={formStyle.select}
          >
            <option value="">Select Gender</option>
            <option value="Cis Woman">Cis Woman</option>
            <option value="Transgender (MF)">Transgender (MF)</option>
            <option value="Transgender (FM)">Transgender (FM)</option>
            <option value="Queer">Queer</option>
            <option value="Non binary">Non binary</option>
            <option value="Other">Other</option>
          </select><br />
          <p className={formStyle.note}>*This app is for non-Cis men</p>
          {errors.gender && <p className={formStyle.error}>{errors.gender}</p>}
          <label htmlFor="pronounce">Pronoun</label><br />
          <select
            name="pronounce"
            id="pronounce"
            value={formData.pronounce}
            onChange={handleChange}
            className={formStyle.select}
          >
            <option value="">Select Pronoun</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
            <option value="Zir/Zer">Zir/Zer</option>
          </select><br />
          <p className={formStyle.note}>*This app is for non-Cis men</p>
          {errors.pronounce && <p className={formStyle.error}>{errors.pronounce}</p>}
          <label htmlFor="email">Email</label><br />
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
          /><br />
          {errors.email && <p className={formStyle.error}>{errors.email}</p>}
          <label htmlFor="pwd">Password</label><br />
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={formData.pwd}
            onChange={handleChange}
            placeholder="*********"
          /><br />
          {errors.pwd && <p className={formStyle.error}>{errors.pwd}</p>}
          <label htmlFor="avatar">Choose an Avatar</label><br />
          <div className={formStyle.avatarDiv}>
            <label className={formStyle.avatarLabel}>
              <input
                type="radio"
                name="avatar"
                value="avatar1.jpg"
                checked={selectedAvatar === 'avatar1.jpg'}
                onChange={handleAvatarChange}
              />
              {/* <img src="/images/avatar1.jpg" alt="Avatar 1" /> */}
            </label>
            <label className={formStyle.avatarLabel}>
              <input
                type="radio"
                name="avatar"
                value="avatar2.jpg"
                checked={selectedAvatar === 'avatar2.jpg'}
                onChange={handleAvatarChange}
              />
              {/* <img src="/images/avatar2.jpg" alt="Avatar 2" /> */}
            </label>
            {/* Add more avatars as needed */}
          </div><br />
          <button type="submit" className={formStyle.CFAButton}>Sign Up</button>
        </form>
        <div className={formStyle.socials}>
          <p className={formStyle.para}>Or Sign Up With</p><br />
          <div className={formStyle.socialIcons}>
            <button className={formStyle.socialBtn}>Icon</button>
            <button className={formStyle.socialBtn2}>Icon</button>
          </div>
          <p className={formStyle.para}>Already have an account?</p>
          <button onClick={() => router.push('/auth/signin')} className={formStyle.signUp}>
            Login
          </button><br />
        </div>
      </div>
    </>
  );
};

export default SignUp;
