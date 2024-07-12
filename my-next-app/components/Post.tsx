import React, { useState } from "react";
import componentStyle from "../styles/components/components.module.scss";

//Styles
import postStyle from "../styles/components/post.module.scss";
import { Purse } from "./userIcons";
import { Comment2 } from "./Icons";
import Link from "next/link";

function Post() {

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
          <Link href={""}><Comment2/></Link>  
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
