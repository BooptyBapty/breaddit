import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { aggregates, posts } from 'aleph-js';
import Post from './Post'

function CommunityPage(props) {
    
    const { community } = useParams()
    const [communities, setCommunities] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [localAddress, setLocalAddress] = useState({});
    const [result, setResult] = useState([{}]);
    const [communityResult, setCommunityResult] = useState('');

    useEffect(()=>{
        if(props.walletAddress!==undefined){setIsLoggedIn(true)} else{props.connectWallet()}
        load()
    },[])
    const load = async()=>{
      if(!props.walletAddress){
        const{WalletAddress, AlephAccount} = await props.connectWallet()
        setLocalAddress({'LocalAddress':WalletAddress, 'LocalAlephAccount':AlephAccount})
        await aggregates.fetch_one(WalletAddress, 'BREADDIT').then((res)=>{
          setCommunities(res.BREADDITCOMMUNITY)
          console.log(communities);
          console.log(communities.includes(community));
          if(communities.includes(community)) setIsFollowing(true)
        })
        const res = await posts.get_posts('BREADDITCOMMUNITY', {hashes:[community]})
        setCommunityResult(res.posts[0])
        const response = await posts.get_posts('BREADDITPOST', {refs:[community]})
        setResult(response.posts)
        setIsLoggedIn(true)
      }else if(props.walletAddress){
        setLocalAddress({'LocalAddress':props.walletAddress, 'LocalAlephAccount':props.alephAccount})
        setIsLoggedIn(true)
        await aggregates.fetch_one(props.walletAddress, 'BREADDIT').then((res)=>{
            setCommunities(res.BREADDITCOMMUNITY)
            console.log(communities);
            console.log(communities.includes(community));
            if(communities.includes(community)) setIsFollowing(true)
        })
        const res = await posts.get_posts('BREADDITCOMMUNITY', {hashes:[community]})
        setCommunityResult(res.posts[0])
        const response = await posts.get_posts('BREADDITPOST', {refs:[community]})
        setResult(response.posts)
      }
    }

  return <div>
    {/* <div className='communityDetails'>
    </div> */}
    {communityResult.item_hash? 
    <div className='userPage'>
      {communityResult.content.name} <br/><hr/><br/>
      {communityResult.item_hash} <br/><hr/><br/>
      {communityResult.content.desc}
      {isLoggedIn?<React.Fragment>
        {isFollowing? <button onClick={async()=>{
          await aggregates.submit(
            localAddress.LocalAddress,
            'BREADDIT', 
            {'BREADDITCOMMUNITY': [community, ...communities]}, 
            {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
          )
          window.location.reload()
        }}>Following</button>:
        <button onClick={async()=>{
          await aggregates.submit(
            localAddress.LocalAddress,
            'BREADDIT', 
            {'BREADDITCOMMUNITY': [community, ...communities]}, 
            {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
          )
          window.location.reload()
        }}>Follow</button>
        }
      </React.Fragment>
    :''}
    </div>:''}
    {result.map((post)=><Post key={post.item_hash} walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default CommunityPage;
