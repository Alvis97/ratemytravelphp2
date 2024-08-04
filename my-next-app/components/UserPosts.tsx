import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

//Styles
import styles from '../styles/pages/account.module.scss'; 

interface Post {
  id: string;
  content: string;
  date: string;
}

const UserPosts = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/fetchUserPosts');
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const postsData: Post[] = await response.json();
          setPosts(postsData);
        } catch (err) {
          console.error('Error fetching posts:', err);
          setError('Error fetching posts');
        }
      } else if (status === 'unauthenticated') {
        setError('You are not authenticated');
      }
    };

    fetchPosts();
  }, [status]);

  const handleDelete = async (id: string) => {
    if (status === 'authenticated') {
      try {
        const response = await fetch(`/api/deletePost?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        // Remove the deleted comment from the state
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== id)
        );
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Error deleting post');
      }
    } else {
      setError('You are not authenticated');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.h2}>User Posts</h2>
      {posts.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <div className={styles.comment}>
          {posts.map(post => (
            <div key={post.id} className={styles.commentItem}>
              <p>{post.id}</p>
              <p>{post.content}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
              <button
                onClick={() => handleDelete(post.id)}
                className={styles.DeleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;