// pages/auth/signin.tsx
import Head from 'next/head';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

//Styles
import formStyle from '../styles/pages/forms.module.scss'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call NextAuth's signIn method
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirect
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect on successful login
        router.push('/success');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className={formStyle.h1}>Login</h1>
            <label htmlFor="email">Email</label><br />
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
            />
          </div><br />
          <div>
            <label htmlFor="password">Password</label><br />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
            />
          </div><br />
          <button type="submit" className={formStyle.CFAButton}>Login</button>
          {error && <div className={formStyle.error}>{error}</div>}
        </form>
      </main>
    </>
  );
};

export default SignIn;
function login() {
    throw new Error('Function not implemented.');
}

