import React, { useEffect, useState } from 'react';
import { posts } from 'aleph-js'
import Post from './Post'

function Posts() {
    const [result, setResult] = useState({"posts":[{'content':{'body':{'title':'','body':''}}}]})

    const load = async()=> setResult(await posts.get_posts('link',{pagination: 20}))

    const renderPosts = ()=>{
        const postList = []
        
        for (let index = 0; index < result.posts.length; index++) {
            postList.push(<Post result={result.posts[index]}/>)            
        }

        return postList
    }

    useEffect(()=>{
        load()
    },[])
    useEffect(()=>{
        console.log(result);
    },[result])

  return <div>
      {renderPosts()}
  </div>;
}

export default Posts;
