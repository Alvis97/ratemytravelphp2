import React, { useState } from "react";
import CommentComponent from "./Comment";
import postStyle from "../styles/components/post.module.scss";
import { Comment2 } from "./Icons";

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
          <p>Report!</p>
          <button onClick={toggleComments} className={postStyle.toggleButton}>
            <Comment2 />
          </button>
        </div>
      </div>

      {isCommentsVisible && (
        <div className={postStyle.divForAllTheComments}>
          <CommentComponent postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default Post;








