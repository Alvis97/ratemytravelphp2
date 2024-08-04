import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

//Styles
import styles from '../styles/pages/account.module.scss'; 

interface Comment {
  id: string;
  content: string;
  date: string;
}

const UserComments = () => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/fetchUserComment');
          if (!response.ok) {
            throw new Error('Failed to fetch comments');
          }
          const commentsData: Comment[] = await response.json();
          setComments(commentsData);
        } catch (err) {
          console.error('Error fetching comments:', err);
          setError('Error fetching comments');
        }
      } else if (status === 'unauthenticated') {
        setError('You are not authenticated');
      }
    };

    fetchComments();
  }, [status]);


  const handleDelete = async (id: string) => {
    if (status === 'authenticated') {
      try {
        const response = await fetch(`/api/deleteComment?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }

        // Remove the deleted comment from the state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        );
      } catch (err) {
        console.error('Error deleting comment:', err);
        setError('Error deleting comment');
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
      <h2 className={styles.h2}>User Comments</h2>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <div className={styles.comment}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.commentItem}>
              <p>{comment.id}</p>
              <p>{comment.content}</p>
              <p>{new Date(comment.date).toLocaleDateString()}</p>
              <button
                onClick={() => handleDelete(comment.id)}
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

export default UserComments;
