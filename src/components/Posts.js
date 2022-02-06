import React, { useEffect, useState } from 'react';
import { posts, aggregates } from 'aleph-js'
import Post from './Post'
import Loading from './Loading'

function Posts(props) {
    const [result, setResult] = useState([])
    const [localWalletAddress, setLocalWalletAddress] = useState(props.walletAddress);

    const load = async ()=>{
        if(!localWalletAddress){
            const {WalletAddress, AlephAccount} = await props.connectWallet()
            let account = await aggregates.fetch_one(WalletAddress, 'BREADDIT')
            const response = await posts.get_posts('BREADDITPOST', {refs:account.BREADDITCOMMUNITY})
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
            let account = await aggregates.fetch_one(localWalletAddress, 'BREADDIT')
            const response = await posts.get_posts('BREADDITPOST', {refs:account.BREADDITCOMMUNITY})
            setResult(response.posts)
        }
        // if(result.length===0){
        //     const response = await posts.get_posts('BREADDITPOST')
        //     setResult(response.posts)
        // }
    }
    
    const loading = ()=>{
        if (result.length === 0) return <Loading/>
    }

    useEffect(()=>{
        load()
    },[])


  return <div className='posts'>
      {loading()}
      {result.map((post)=><Post key={post.item_hash} walletAddress={localWalletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default Posts;
