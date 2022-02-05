import React, { useEffect, useState } from 'react';
import { posts, aggregates } from 'aleph-js'
import Post from './Post'

function Posts(props) {
    const [result, setResult] = useState([])
    const [localWalletAddress, setLocalWalletAddress] = useState(props.walletAddress);

    const load = async ()=>{
        if(!localWalletAddress){
            const {WalletAddress, AlephAccount} = await props.connectWallet()
            let communities = await aggregates.fetch_one(WalletAddress, 'BREADDIT')
            const response = await posts.get_posts('BREADDITPOST', {refs:communities.BREADDIT})
            setLocalWalletAddress(WalletAddress)
            setResult(response.posts)
                // const url = `wss://api2.aleph.im/api/ws0/messages?msgType=POST&addresses=${WalletAddress}`
                
                // const connection = new WebSocket(url) 
                
                // connection.onmessage = (e) => { 
                //     let parsedJson = JSON.parse(e.data)
                //     if(parsedJson.content !== undefined){
                //         if(parsedJson.content.ref === 'BreadditTest') {
                //             parsedJson.content.item_hash = parsedJson.item_hash
                //             setResult(previousPosts => [parsedJson.content, ...previousPosts])
                //             if(parsedJson.address === WalletAddress) {
                //                 props.setIsLoading(false)
                //                 props.setCreatePostModal(false)
                //             }
                //         }
                //     }
                // }
        } else if(localWalletAddress){
            const response = await posts.get_posts('BREADDITPOST')
            setResult(response.posts)
        }
        if(result.length===0){
            const response = await posts.get_posts('BREADDITPOST')
            setResult(response.posts)
        }
    }
    useEffect(()=>{
        load()
    },[])

  return <div className='posts'>
      {result.map((post)=><Post key={post.item_hash} walletAddress={localWalletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default Posts;
