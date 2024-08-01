// pages/auth/signin.tsx
import Head from 'next/head';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LoginImage, Stars } from '../components/LoginImage';
import { Fb, Google } from '../components/Icons';
import error from 'next/error';

//Styles
import formStyle from '../styles/pages/forms.module.scss'; 

//Using signIn from nextAuth
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Start function when submit button is clicked
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect on successful login
        console.log('')
        const session = await fetch('api/auth/session').then(res => res.json());
        console.log(session);
        
        if (session.user.role === 'admin') {
          router.push('/admin'); // go to admin page
          console.log('logged in as admin');
        } else {
          router.push('/success'); //community page
          console.log('logged in as user');
        }
      }
    
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
        <div className={formStyle.loginForm}>
          <div className={formStyle.child1}>
            <h1 className={formStyle.h1}>Welcome back!</h1>
            <Stars/>
            <LoginImage/>
          </div>

          <div className={formStyle.child2}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className={formStyle.h2}>Login</h2>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div><br />
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div><br />
          <button type="submit" className={formStyle.CFAButton}>Login</button>
          {error && <div className={formStyle.error}>{error}</div>}
        </form>
           <div className={formStyle.devider}><hr className={formStyle.hr}/><p className={formStyle.p}>or</p><hr className={formStyle.hr}/></div>
           <button className={formStyle.fbButton}> <Fb/> Log in with Facebook</button>
           <button className={formStyle.GoogleButton}> <Google/>  Log in with Google</button>
        </div>
        </div>
      </main>
    </>
  );
  } 


export default SignIn;
function login() {
    throw new Error('Function not implemented.');
}

