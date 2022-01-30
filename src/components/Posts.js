import React, { useEffect, useState } from 'react';
import { posts } from 'aleph-js'
import Post from './Post'

function Posts() {
    const [result, setResult] = useState({"posts":[{'content':{'body':{'title':'','body':''}}}]})

    const load = async()=> setResult(await posts.get_posts('link',{pagination: 20}))
    useEffect(()=>{
        load()
    },[])
    useEffect(()=>{
        console.log(result);
    },[result])

  return <div>
      <Post result={result.posts[0]}/>
  </div>;
}

export default Posts;
