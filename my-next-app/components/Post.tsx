import React, { useState } from "react";
import CommentComponent from "./Comment";
import postStyle from "../styles/components/post.module.scss";
import { Comment2, Report } from "./Icons";
import ReportModal from "./ReportModal";

interface PostProps {
  post: {
    id: string;
    userId: string;
    userImage: string;
    userName: string;
    userAge: string;
    userPronouns: string;
    content: string;
    date: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  }

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleSubmitReport = async (reason: string) => {
    const reportData = {
      reason,
      postId: post.id,
      userId: post.userId,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/addReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        console.log('Report submitted successfully');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        console.error('Failed to submit report');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
    setIsReportModalOpen(false);
  };

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className={postStyle.Parent}>
      <div className={postStyle.Post}>
        <div className={postStyle.top}>
          <div className={postStyle.topLeft}>
            <img
              className={postStyle.profileIMG}
              src={post.userImage ? `/images/${post.userImage}` : 'images/default-avatar.jpg'}
              alt="Profile picture"
            />
            <div className={postStyle.topColumn}>
              <p className={postStyle.p1}>{post.userName}, {post.userAge}</p>
              <p className={postStyle.p2}>{post.userPronouns}</p>
            </div>
          </div>
          <div>
            <p>{formattedDate}</p>
          </div>
        </div>
        <p>{post.content}</p>
        <div className={postStyle.bottomDiv}>
        <button  className={postStyle.toggleButton} onClick={handleOpenReportModal}>
             <Report/>
          </button>
          <button onClick={toggleComments} className={postStyle.toggleButton}>
            <Comment2 />
          </button>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitReport}
      />

      {showSuccessMessage && (
        <div className={postStyle.successMessage}>
          Thanks for your report! 
          We take it from here.
        </div>
      )}

      {isCommentsVisible && (
        <div className={postStyle.divForAllTheComments}>
          <CommentComponent postId={post.id} />
        </div>
      )}
   
    </div>
  );
};

export default Post;








