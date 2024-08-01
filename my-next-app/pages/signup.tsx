// pages/auth/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { signIn } from 'next-auth/react';
import { LoginImage, Stars } from '../components/LoginImage';
import { Fb, Google } from '../components/Icons';
import { validateSignUpForm, SignUpFormErrors } from '../utils/formValidation';

import formStyle from '../styles/pages/forms.module.scss';
import email from 'next-auth/providers/email';

//use signup from router
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
        //const result = await signIn('credentials', {
          //redirect: false,
          //email: formData.email,
          //password: formData.pwd,
        //});

        //if (result?.error) {
          //setErrors({ ...errors, form: 'Sign-up successful but login failed.' });
        //} else {
          router.push('/'); // Redirect to the home page on successful login
        }
       else {
        throw new Error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({ ...errors, form: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <>
    <main>
    <div className={formStyle.loginForm}>

      <div className={formStyle.child1}>
        <h1 className={formStyle.h1}>Join our Community!</h1>
        <Stars/>
        <LoginImage/>
      </div>

      <div className={formStyle.child2}>
        <h2 className={formStyle.h2}>Sign Up</h2>
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="fName"
              id="fName"
              value={formData.fName}
              onChange={handleChange}
              placeholder="First Name"
            /><br />
            {errors.fName && <p className={formStyle.error}>{errors.fName}</p>}

            <input
              type="text"
              name="lName"
              id="lName"
              value={formData.lName}
              onChange={handleChange}
              placeholder="Last Name"
            /><br />
            {errors.lName && <p className={formStyle.error}>{errors.lName}</p>}
            <input
              type="text"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            /><br />
            {errors.age && <p className={formStyle.error}>{errors.age}</p>}
            
            <div className={formStyle.dropDownDiv}>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className={formStyle.select2}
            >
              <option value="">Gender</option>
              <option value="Cis Woman">Cis Woman</option>
              <option value="Transgender (MF)">Transgender (MF)</option>
              <option value="Transgender (FM)">Transgender (FM)</option>
              <option value="Queer">Queer</option>
              <option value="Non binary">Non binary</option>
              <option value="Other">Other</option>
            </select><br />

            <select
              name="pronounce"
              id="pronounce"
              value={formData.pronounce}
              onChange={handleChange}
              className={formStyle.select2}
            >
              <option value="">Pronounce</option>
              <option value="She/Her">She/Her</option>
              <option value="He/Him">He/Him</option>
              <option value="They/Them">They/Them</option>
              <option value="Zir/Zer">Zir/Zer</option>
            </select><br />
            </div>

            <p className={formStyle.note}>*This app is for non-Cis men</p>
            {errors.pronounce && <p className={formStyle.error}>{errors.pronounce}</p>}
            {errors.gender && <p className={formStyle.error}>{errors.gender}</p>}

            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            /><br />
            {errors.email && <p className={formStyle.error}>{errors.email}</p>}
          
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={formData.pwd}
              onChange={handleChange}
              placeholder="Password"
            /><br />
            {errors.pwd && <p className={formStyle.error}>{errors.pwd}</p>}
            
                <label className={formStyle.avatarP} htmlFor="avatar">Choose an Avatar</label><br />
                <div className={formStyle.avatarDiv}>
                  <label className={formStyle.avatarLabel}>
                    <input
                      type="radio"
                      name="avatar"
                      value="avatar1.jpg"
                      checked={selectedAvatar === 'avatar1.jpg'}
                      onChange={handleAvatarChange}
                    />
                     <img src="/images/avatar1.jpg" alt="Avatar 1" /> 
                  </label>
                  <label className={formStyle.avatarLabel}>
                    <input
                      type="radio"
                      name="avatar"
                      value="avatar2.jpg"
                      checked={selectedAvatar === 'avatar2.jpg'}
                      onChange={handleAvatarChange}
                    />
                     <img src="/images/avatar2.jpg" alt="Avatar 2" /> 
                  </label>

                  <label className={formStyle.avatarLabel}>
                    <input
                      type="radio"
                      name="avatar"
                      value="avatar3.jpg"
                      checked={selectedAvatar === 'avatar3.jpg'}
                      onChange={handleAvatarChange}
                    />
                     <img src="/images/avatar3.jpg" alt="Avatar 3" /> 
                  </label>

                  <label className={formStyle.avatarLabel}>
                    <input
                      type="radio"
                      name="avatar"
                      value="avatar4.jpg"
                      checked={selectedAvatar === 'avatar4.jpg'}
                      onChange={handleAvatarChange}
                    />
                     <img src="/images/avatar4.jpg" alt="Avatar 4" /> 
                  </label>

                  <label className={formStyle.avatarLabel}>
                    <input
                      type="radio"
                      name="avatar"
                      value="avatar5.jpg"
                      checked={selectedAvatar === 'avatar5.jpg'}
                      onChange={handleAvatarChange}
                    />
                     <img src="/images/avatar5.jpg" alt="Avatar 5" /> 
                  </label>
                
                </div><br />
                <button type="submit" className={formStyle.CFAButton}>Sign Up</button>
              </form>
              <div className={formStyle.devider}><hr className={formStyle.hr}/><p className={formStyle.p}>or</p><hr className={formStyle.hr}/></div>
           <div className={formStyle.socialLogin}>
           <button className={formStyle.fbButton2}><Fb/> </button>
           <button className={formStyle.GoogleButton2}><Google/> </button>
           </div>
      </div>
               
    </div>
    </main>
  </>
  );
};

export default SignUp;
