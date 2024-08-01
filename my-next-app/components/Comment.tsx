import React, { useState, useEffect } from 'react';
import commentStyle from '../styles/components/comment.module.scss';
import { Report } from './Icons';
import ReportModal from './ReportModal';


interface Comment {
  id: string;
  content: string;
  user: { firstName: string, age: string, Image: string, pronounce: string };
  date: string;
}

interface CommentComponentProps {
  postId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/fetchComments?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, content: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    }
  };

  const handleReportComment = async (reason: string) => {
    if (selectedCommentId) {
      try {
        const response = await fetch('/api/reportComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commentId: selectedCommentId, reason }),
        });

        if (!response.ok) {
          throw new Error('Failed to report comment');
        }

        await response.json();
        setIsModalOpen(false);
        alert('Comment reported successfully');
        // Optionally, refresh the comments or update the UI accordingly
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={commentStyle.dropdown}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className={commentStyle.commentDiv}>
                
                <div className={commentStyle.TopContainer}>

                  <div className={commentStyle.Left}>
                    {comment.user ? (
                    <>
                    <div>

                      <img src={`/images/${comment.user.Image}`} className={commentStyle.profilePic} alt="profile image"/>
                    </div>
                    <div className={commentStyle.container}>
                      <p className={commentStyle.Name}>
                          {comment.user.firstName}, 
                        {comment.user.age} 
                   
                      </p>
                      <p className={commentStyle.pronounce}>
                      {comment.user.pronounce} 
                        </p>
                    </div>
                    </>
                    ) : (
                      <p>User information is missing</p>
                    )}
                  </div>

                  <div className={commentStyle.right}>
                     <p className={commentStyle.date}>{new Date(comment.date).toLocaleString()}</p>
                  </div>

                </div>
            
                <p className={commentStyle.content}>{comment.content}</p>

                <div className={commentStyle.bottom}>
                  <button 
                    className={commentStyle.btn}
                    onClick={() => {
                      setSelectedCommentId(comment.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <Report/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <form onSubmit={handleCommentSubmit} className={commentStyle.commentForm}>
            <textarea
              className={commentStyle.commentInput}
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              required
            />
            <button type="submit" className={commentStyle.CFAButton}>Submit</button>
          </form>
          <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleReportComment}
        itemType="comment" // or "post" depending on the context
        itemId={selectedCommentId || ""} // Pass the selected comment ID
      />
        </div>
      )}
    </div>
  );
};

export default CommentComponent;





