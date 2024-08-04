// pages/serverProtectedPage.tsx
import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const ServerProtectedPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        You are not signed in. <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>Your role is: {session.user.role}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/logIn',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ServerProtectedPage;
