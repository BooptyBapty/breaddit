import React, { useEffect, useState } from 'react';
import { posts } from 'aleph-js'
import Post from './Post'

function Posts(props) {
    const [result, setResult] = useState([{}])

    const load = async ()=>{
        const response = await posts.get_posts('TestSubreddit')
        setResult(response.posts)
        const contentType = 'chat'
        const url = `wss://api2.aleph.im/api/ws0/messages?msgType=POST&refs=${contentType}`

        const connection = new WebSocket(url) 

        connection.onmessage = (e) => { 
            let parsedJson = JSON.parse(e.data)
            if(parsedJson.content !== undefined){
                if(parsedJson.content.ref === 'TestSubreddit') {
                    parsedJson.content.item_hash = parsedJson.item_hash
                    setResult(previousPosts => [parsedJson.content, ...previousPosts])
                    if(parsedJson.address === props.walletAddress) {
                        props.setIsLoading(false)
                        props.setCreatePostModal(false)
                    }
                }
            }
        }
    }
    useEffect(()=>{
        load()
    },[])

  return <div className='posts'>
      {result.map((post)=><Post key={post.item_hash} walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default Posts;
