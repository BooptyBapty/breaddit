import React, { useState, useEffect } from 'react';

/* 
    UPVOTE
    DOWNVOTE
    SUBREDDIT
    POSTER
    COMMENTS
 */

function Post(props) {
    const upvote = async () => {

    }
    const downvote = async () => {

    }

  return <div className='container mt-5'>
      <input readOnly value={props.result.content.body.title}></input>
      <br></br>
      <input readOnly value={props.result.content.body.body}></input>
  </div>;
}

export default Post;
