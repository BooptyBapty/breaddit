import React from 'react';
import moment from 'moment';

function Comment(props) {
  return <div className='postPage comment'>
            <span className='post-credit'> {props.result.address.slice(0,5) + `...` + props.result.address.slice(props.result.address.length - 4, props.result.address.length) + ` • ` + moment.unix(props.result.time).fromNow() } </span>
            <span className='comment-body'>{props.result.content.body}</span>
        </div>
}

export default Comment;
