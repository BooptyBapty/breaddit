import React from 'react';
import UpvoteLogo from'../icons/upvote-hollow.svg'
import DownvoteLogo from'../icons/downvote-hollow.svg'
import moment from 'moment'

/* 
    UPVOTE
    DOWNVOTE
    SUBREDDIT
    POSTER
    COMMENTS
 */

function Post(props) {
    const upvote = async () => {
        console.log('upvoted');
    }
    const downvote = async () => {
        console.log('downvoted');
    }

  return<div className='post'>
            <div className='vote-container rounded-l-sm'>
                <button className='vote upvote' onClick={()=>{upvote()}}><img src={UpvoteLogo} alt='upvoteimg'></img></button>
                <div className='net-vote'>{props.result.content.body.upvote - props.result.content.body.downvote}</div>
                <button className='vote downvote' onClick={()=>{downvote()}}><img src={DownvoteLogo} alt='downvoteimg'></img></button>
            </div>
            <div className='post-content'>
                <input className='post-credit' readOnly value={`Posted by ` + props.result.address + ` ` + moment.unix(props.result.time).fromNow() }></input>
                <input className='post-title' readOnly value={props.result.content.body.title}></input>
                {/* <input className='post-body' readOnly value={props.result.content.body.body}></input> */}
            </div>
        </div>;
}

export default Post;
