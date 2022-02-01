import React, { useEffect, useState } from 'react';
import { posts } from 'aleph-js'
import Post from './Post'

function Posts(props) {
    const [result, setResult] = useState({"posts":[{'content':{'body':{'title':'','body':''}}}]})

    const load = async()=> setResult(await posts.get_posts('TestSubreddit',{pagination: 20}))

    const renderPosts = ()=>{
        const postList = []
        
        for (let index = 0; index < result.posts.length; index++) {
            postList.push(<Post walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={result.posts[index]}/>)            
        }

        return postList
    }

    useEffect(()=>{
        load()
    },[])
    useEffect(()=>{
        console.log(result);
    },[result])

  return <div className='container posts my-2'>
      {renderPosts()}
  </div>;
}

export default Posts;
