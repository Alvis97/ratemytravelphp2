
import React, { useState } from 'react';
import Link from 'next/link';
import { Comment2 } from './Icons';

//style
import commentStyle from '../styles/components/comment.module.scss';

interface Comment {
  id: string;
  text: string;
  user: string;
}

interface CommentComponentProps {
  comments: Comment[];
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comments }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Link href="" legacyBehavior>
          <a>
            <Comment2 />
          </a>
        </Link>
      {isDropdownOpen && (
        <div className={commentStyle.dropdown}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className={commentStyle.comment}>
                <p>{comment.user}: {comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
