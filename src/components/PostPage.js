import React from 'react';
import { posts } from 'aleph-js'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import moment from 'moment'
import Loading from './Loading'
import CreateComment from './CreateComment';
import Comment from './Comment'

function PostPage(props) {
    const [result, setResult] = useState({});
    const [commentResult, setCommentResult] = useState([{}])
    const { item_hash } = useParams()
    const load = async()=>{
        const response = await posts.get_posts('TestSubreddit', { hashes:[item_hash]})
        setResult(response.posts[0])
        const commentResponse = await posts.get_posts('BREADDITCOMMENT', {refs:[item_hash]})
        setCommentResult(commentResponse.posts)
    }
    useEffect(()=>{
        load()
    },[])

  return <div>
      {
          !result.content? <Loading/>
          :
          <React.Fragment>
            <div className='postPage'>
                <div className='post-metadata'>
                    <span className='post-subreddit'>{result.content.body.community}</span>
                    <span className='post-credit'>{` - Posted by ` + result.address.slice(0,5) + `...` + result.address.slice(result.address.length - 4, result.address.length) + ` • ` + moment.unix(result.time).fromNow() }</span>
                </div>
                <span className='postPage-title'>{result.content.body.title}</span>
                <span className='postPage-body'>{result.content.body.body}</span>
            </div>
            <CreateComment walletAddress={props.walletAddress} alephAccount={props.alephAccount} post_hash={item_hash}/>
            {!commentResult[0].content? '':
            commentResult.map((post)=><Comment key={post.item_hash} result={post}/>)
            }
            
          </React.Fragment>
      }
  </div>;
}

export default PostPage;
