import React from 'react';
import UpvoteLogo from'../icons/upvote.png'
import DownvoteLogo from'../icons/downvote.png'

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

  return <div className='post border rounded-md'>
            <div className='vote-container rounded-l-md'>
                <button className='vote' onClick={()=>{upvote()}}><img src={UpvoteLogo} alt='upvoteimg'></img></button>
                <button className='vote' onClick={()=>{downvote()}}><img src={DownvoteLogo} alt='downvoteimg'></img></button>
            </div>
            <div className='post-content'>
                <input readOnly value={props.result.content.body.title}></input>
                <input readOnly value={props.result.content.body.body}></input>
            </div>
        </div>;
}

export default Post;
