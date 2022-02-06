import React, { useEffect, useState } from 'react';
import { posts, aggregates } from 'aleph-js'
import Post from './Post'
import Loading from './Loading'

function Posts(props) {
    const [result, setResult] = useState([])
    const [localWalletAddress, setLocalWalletAddress] = useState(props.walletAddress);

    const load = async ()=>{
        try{
            if(!localWalletAddress){
                const {WalletAddress, AlephAccount} = await props.connectWallet()
                let account = await aggregates.fetch_one(WalletAddress, 'BREADDIT')
                const response = await posts.get_posts('BREADDITPOST', {refs:account.BREADDITCOMMUNITY})
                setLocalWalletAddress(WalletAddress)
                setResult(response.posts)
            }else if(localWalletAddress){
                let account = await aggregates.fetch_one(localWalletAddress, 'BREADDIT')
                const response = await posts.get_posts('BREADDITPOST', {refs:account.BREADDITCOMMUNITY})
                setResult(response.posts)}
        }catch{
            const response = await posts.get_posts('BREADDITPOST')
            setResult(response.posts)
        }
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
