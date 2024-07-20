import React, { useState } from 'react';
import { useRouter } from 'next/router';
import formStyle from '../styles/components/formStyle.module.scss';
import   { SignUpFormErrors, validateSignUpForm } from '../utils/formValidation';
//import { Backpack, Beach, BrownBag, Luggage, Purse } from './userIcons';



interface SignUpFormProps {
  closeModal: () => void;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ closeModal }) => {
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

  // State to manage selected avatar
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

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Sign-up successful');
        closeModal();
        router.push('/'); // Redirect to the home page on successful sign-up
      } else {
        throw new Error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
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
                <p className={formStyle.note}>*This app is for non Cis men</p>
                {errors.gender && <p className={formStyle.error}>{errors.gender}</p>}
                <label htmlFor="pronounce">Pronounce</label><br />
                <select
                    name="pronounce"
                    id="pronounce"
                    value={formData.pronounce}
                    onChange={handleChange}
                    className={formStyle.select}
                >
                    <option value="">Select Pronounce</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Him">He/Him</option>
                    <option value="They/Them">They/Them</option>
                    <option value="Zir/Zer">Zir/Zer</option>
                </select><br />
                <p className={formStyle.note}>*This app is for non Cis men</p>
                {errors.gender && <p className={formStyle.error}>{errors.gender}</p>}
            <label htmlFor="email">Email</label><br />
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@hotmail.com"
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
                        
                        {/*<img src="/images/avatar3.jpg" alt="Avatar 5" />*/}
                    </label>
                    <label className={formStyle.avatarLabel}>
                        <input
                            type="radio"
                            name="avatar"
                            value="avatar2.jpg"
                            checked={selectedAvatar === 'avatar2.jpg'}
                            onChange={handleAvatarChange}
                        />
                        
                    {/*<img src="/images/avatar3.jpg" alt="Avatar 5" />*/}
                    </label>
                    <label className={formStyle.avatarLabel}>
                        <input
                            type="radio"
                            name="avatar"
                            value="avatar3.jpg"
                            checked={selectedAvatar === 'avatar3.jpg'}
                            onChange={handleAvatarChange}
                        />
                        
                         {/*<img src="/images/avatar3.jpg" alt="Avatar 5" />*/}
                    </label>
                    <label className={formStyle.avatarLabel}>
                        <input
                            type="radio"
                            name="avatar"
                            value="avatar4.jpg"
                            checked={selectedAvatar === 'avatar4.jpg'}
                            onChange={handleAvatarChange}
                        />
                       
                         {/*<img src="/images/avatar3.jpg" alt="Avatar 5" />*/}
                    </label>
                    <label className={formStyle.avatarLabel}>
                        <input
                            type="radio"
                            name="avatar"
                            value="avatar5.jpg"
                            checked={selectedAvatar === 'avatar5.jpg'}
                            onChange={handleAvatarChange}
                        />
                       
                        {/*<img src="/images/avatar3.jpg" alt="Avatar 5" />*/}
                    </label>
                </div><br />


            <button type="submit" className={formStyle.CFAButton}>
              Sign Up
            </button>
          </form>
          <div className={formStyle.socials}>
            <p className={formStyle.para}>Or Sign Up With</p><br />
            <div className={formStyle.socialIcons}>
              <button className={formStyle.socialBtn}>Icon</button>
              <button className={formStyle.socialBtn2}>Icon</button>
            </div>
            <p className={formStyle.para}>Already have an account?</p>
            <button onClick={()=> router.push('/login')} className={formStyle.signUp}>
              Login
            </button><br />

        </div>
        </div>
         

            <div className={formStyle.Success}>
              <h2>Welcome to rate my travel!</h2>
              <h3>You are now ready to log in</h3>
              <button> Log in here </button>
            </div>
          
        </>
      );
    };
    
    export default SignUpForm;

function closeModal(): void {
  throw new Error('Function not implemented.');
}
