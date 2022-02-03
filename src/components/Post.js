import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from './Loading'

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

  return<React.Fragment>
      {!props.result.content? <Loading/>:
        <div className='post'>
                <div className='vote-container'>
                    <button className='vote upvote' onClick={()=>{upvote()}}><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.2755 16.6636V30H9.72967V16.6586V16.4516L9.58337 16.3052L9.57837 16.3002L9.43194 16.1538H9.22493H1.13299L14.8693 1.23456L28.858 16.1538H20.7853H20.5783L20.4318 16.3002L20.4269 16.3051L20.4221 16.3099L20.2755 16.4564V16.6636Z"/></svg></button>
                    <div className='net-vote'>0</div>
                    <button className='vote downvote' onClick={()=>{downvote()}}><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.2755 14.3364V1H9.72967V14.3414V14.5484L9.58337 14.6948L9.57837 14.6998L9.43194 14.8462H9.22493H1.13299L14.8693 29.7654L28.858 14.8462H20.7853H20.5783L20.4318 14.6998L20.4269 14.6949L20.4221 14.6901L20.2755 14.5436V14.3364Z"/></svg></button>
                </div>
                <hr className='vote-divider'></hr>
                <Link className='post-link' to={`/post/${props.result.item_hash}`}>
                    <div className='post-content'>
                        <div className='post-metadata'>
                            <span className='post-subreddit'>{props.result.content.body.community}</span>
                            <span className='post-credit'>{` - Posted by ` + props.result.address.slice(0,5) + `...` + props.result.address.slice(props.result.address.length - 4, props.result.address.length) + ` • ` + moment.unix(props.result.time).fromNow() }</span>
                        </div>
                        <span className='post-title'>{props.result.content.body.title}</span>
                    </div>
                </Link>
        </div>
      }
        </React.Fragment>;
}

export default Post;
