import React, { useEffect, useState } from "react";
import Head from "next/head";
import Post from "../components/Post";
import { Pen } from "../components/Icons";

// Style
import SuccessStyle from "../styles/pages/success.module.scss";
import { WritePostIcon } from "../components/LoginImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


//Creating a array for the user to store all information???
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  pronounce: string;
  Image: string;
}

interface Post {
  id: string;
  userId: string;
  userImage: string;
  userName: string;
  userAge: string;
  userPronouns: string;
  content: string;
  date: string;
}

//creating an asycronious function, where we use user, loading, error.
const Success = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  //Starting the progress of getting the details
  useEffect(() => {
    //Fetch user
    const fetchUser = async () => {
        //The reqcuest
      try {
        const response = await fetch('/api/user');
        //If anny errors
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    //If no errors
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/fetchPost');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try{
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userImage: user.Image,
          userName: user.firstName,
          userAge: parseInt(user.age),
          userPronouns: user.pronounce,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Reset from content
      setContent("");
      setShowModal(false);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  useEffect(() => {
    // Redirect to login page if the session is not available
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Return null or a loading indicator while redirecting
  if (status === 'loading' || status === 'unauthenticated') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <main>
        <div className={SuccessStyle.Parent}>
        <div className={SuccessStyle.child1}>
            
        {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}


            </div>
            <div className={SuccessStyle.writePostDiv}>
            <button className={SuccessStyle.writePost} onClick={() => setShowModal(true)}>
                <WritePostIcon/>
                Write a Post
            </button>
            </div>
            {showModal && (
            <div className={SuccessStyle.modal}>
              <div className={SuccessStyle.modalContent}>
                <button
                  className={SuccessStyle.closeButton}
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                {user ? (
                  <>
                  
                   
                    <form onSubmit={handleSubmit}>
                      <div className={SuccessStyle.fetchArea}>
                        <img
                          className={SuccessStyle.profileIMG}
                          src={`/images/${user.Image}`}
                          alt="Profile picture"
                        />
                        <div>
                          <p className={SuccessStyle.p1}>
                            {user.firstName}, {user.age}
                          </p>
                          <p className={SuccessStyle.p2}>{user.pronounce}</p>
                          <p className={SuccessStyle.p3}>{user.id}</p>
                        </div>
                      </div>
                      <textarea
                        className={SuccessStyle.textarea}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing a post..."
                      ></textarea> <br />
                      <button className={SuccessStyle.CFAButton}>Post</button>
                    </form>
                  
                  </>
                ) : (
                  <div>No user data available</div>
                )}
              </div>
             
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Success;



