import React, { useState } from 'react';
import { useRouter } from 'next/router';
import formStyle from '../styles/components/formStyle.module.scss';

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [FormData, setFormData] = useState({
        fName: '',
        lName: '',
        age: '',
        gender: '',
        email: '',
        pwd: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sign-up successful', data);
                router.push('/success');
            } else {
                throw new Error('Sign-up failed');
            }
        }catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <>
          <h1 className={formStyle.h1}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fName">First Name</label><br />
            <input
              type="text"
              name="fName"
              id="fName"
              value={FormData.fName}
              onChange={handleChange}
              placeholder="Sam"
            /><br />
            <label htmlFor="lName">Last Name</label><br />
            <input
              type="text"
              name="lName"
              id="lName"
              value={FormData.lName}
              onChange={handleChange}
              placeholder="Borg"
            /><br />
            <label htmlFor="age">Age</label><br />
            <input
              type="text"
              name="age"
              id="age"
              value={FormData.age}
              onChange={handleChange}
              placeholder="22"
            /><br />
            <label htmlFor="gender">Gender</label><br />
            <input
              type="text"
              name="gender"
              id="gender"
              value={FormData.gender}
              onChange={handleChange}
              placeholder="Male/Female/Other"
            /><br />
            <label htmlFor="email">Email</label><br />
            <input
              type="text"
              name="email"
              id="email"
              value={FormData.email}
              onChange={handleChange}
              placeholder="example@hotmail.com"
            /><br />
            <label htmlFor="pwd">Password</label><br />
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={FormData.pwd}
              onChange={handleChange}
              placeholder="*********"
            /><br />
            <button type="submit" className={formStyle.CFAButton}>
              Sign Up
            </button>
          </form>
          <div className={formStyle.socials}>
            <p className={formStyle.para}>Or Sign Up With</p><br />
            <div className={formStyle.socialIcons}>
              <button>Icon</button>
              <button>Icon</button>
            </div>
            <p className={formStyle.para}>Already have an account?</p>
            <button onClick={() => router.push('/login')} className={formStyle.signUp}>
              Login
            </button><br />
          </div>
        </>
      );
    };
    
    export default SignUpForm;