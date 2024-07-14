import React, { useEffect, useState } from "react";
import { Comment2 } from "./Icons";
import Link from "next/link";
import CommentComponent from "./Comment";

//Styles
import postStyle from "../styles/components/post.module.scss";


interface Comment {
    id: string;
    text: string;
    user: string;
  }

  const Post = () => {
    const [comments, setComments] = useState<Comment[]>([]);
  
    useEffect(() => {
      // Fetch comments from the database (replace with your actual data fetching logic)
      fetch('/api/comments')
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error('Error fetching comments:', error));
    }, []);

  return (
    <div className={postStyle.Parent}>
       <div  className={postStyle.top}>
        <p>Icon:avatar</p>
        <div>
            <p>Firstname, Age</p>
            <p>Gender</p>
        </div>
       </div>
       <div  className={postStyle.bottom}>
        <p>This is where all the text will be printed</p>

       </div>
       <div  className={postStyle.comment}>
       <CommentComponent comments={comments} /> 
        </div>
    </div>
  );
}

export default Post;

{/**{posts.map(post => (
    <Post
      key={post.id}
      firstName={post.firstName}
      age={post.age}
      gender={post.gender}
      text={post.text}
    />
  ))} */}
