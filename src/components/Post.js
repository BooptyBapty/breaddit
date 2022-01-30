import React from 'react';
import UpvoteLogo from'../icons/upvote-hollow.svg'
import DownvoteLogo from'../icons/downvote-hollow.svg'

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

  return <div className=''>
      <button className='' onClick={()=>{upvote()}}><img src={UpvoteLogo} alt='upvoteimg'></img></button>
      <button className='' onClick={()=>{downvote()}}><img src={DownvoteLogo} alt='downvoteimg'></img></button>
      <input readOnly value={props.result.content.body.title}></input>
      <br></br>
      <input readOnly value={props.result.content.body.body}></input>
  </div>;
}

export default Post;
