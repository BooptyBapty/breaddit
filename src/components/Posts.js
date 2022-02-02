import React, { useEffect, useState } from 'react';
import { posts } from 'aleph-js'
import Post from './Post'

function Posts(props) {
    const [result, setResult] = useState([{}])

    // const containsID = element=>{
    //     return element.item_hash == this
    // }

    const load = async ()=>{
        const response = await posts.get_posts('TestSubreddit')
        setResult(response.posts)
        const contentType = 'chat'
        const url = `wss://api2.aleph.im/api/ws0/messages?msgType=POST&refs=${contentType}`

        const connection = new WebSocket(url) 

        connection.onmessage = (e) => { 
            let parsedJson = JSON.parse(e.data)
            if (parsedJson.content.ref){
                if(parsedJson.content.ref === 'TestSubreddit') {
                    if(parsedJson.address === props.walletAddress) {
                        props.setIsLoading(false)
                        props.setCreatePostModal(false)
                    }
                    setResult(previousPosts => [parsedJson.content, ...previousPosts])
                }
            }
        }
    }
    useEffect(()=>{
        load()
    },[])

  return <div className='container posts my-2'>
      {result.map((post)=><Post key={post.item_hash} walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default Posts;
