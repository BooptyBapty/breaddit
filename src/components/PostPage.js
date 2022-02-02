import React from 'react';
import { posts } from 'aleph-js'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import moment from 'moment'

function PostPage(props) {
    const [result, setResult] = useState({});
    const { item_hash } = useParams()
    const load = async()=>{
        const response = await posts.get_posts('TestSubreddit', { hashes:[item_hash]})
        setResult(response.posts[0])
    }

    useEffect(()=>{
        load()
    },[])

  return <div className='postPage'>
      {
          !result.content? ''
          :
        <div className='post-content'>
            <div className='post-metadata'>
                <span className='post-subreddit'>{result.content.body.community}</span>
                <span className='post-credit'>{` - Posted by ` + result.address.slice(0,5) + `...` + result.address.slice(result.address.length - 4, result.address.length) + ` • ` + moment.unix(result.time).fromNow() }</span>
            </div>
            <span className='post-title'>{result.content.body.title}</span>
            <span className='post-body'>{result.content.body.body}</span>
        </div>
      }
  </div>;
}

export default PostPage;
