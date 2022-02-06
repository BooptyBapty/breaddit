import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { aggregates, posts } from 'aleph-js';
import Post from './Post'

function CommunityPage(props) {
    
    const { community } = useParams()
    const [communities, setCommunities] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [localAddress, setLocalAddress] = useState({});
    const [result, setResult] = useState([{}]);
    const [communityResult, setCommunityResult] = useState('');

    const load = async()=>{
    if(!props.walletAddress){
      const{WalletAddress, AlephAccount} = await props.connectWallet()
      setLocalAddress({'LocalAddress':WalletAddress, 'LocalAlephAccount':AlephAccount})
      const temp = await aggregates.fetch_one(WalletAddress, 'BREADDIT')
      setCommunities(temp.BREADDITCOMMUNITY)
      if(temp.BREADDITCOMMUNITY.includes(community)) setIsFollowing(true)
      const res = await posts.get_posts('BREADDITCOMMUNITY', {hashes:[community]})
      setCommunityResult(res.posts[0])
      const response = await posts.get_posts('BREADDITPOST', {refs:[community]})
      setResult(response.posts)
    }else if(props.walletAddress){
      setLocalAddress({'LocalAddress':props.walletAddress, 'LocalAlephAccount':props.alephAccount})
      const temp = await aggregates.fetch_one(props.walletAddress, 'BREADDIT')
      setCommunities(temp.BREADDITCOMMUNITY)
      if(temp.BREADDITCOMMUNITY.includes(community)) setIsFollowing(true)
      const res = await posts.get_posts('BREADDITCOMMUNITY', {hashes:[community]})
      setCommunityResult(res.posts[0])
      const response = await posts.get_posts('BREADDITPOST', {refs:[community]})
      setResult(response.posts)
    }
  }
  useEffect(()=>{
      if(props.walletAddress===undefined){props.connectWallet()}
      load()
    },[])

    // const followButton = ()=>{

    //   switch(isFollowing){
    //     case true:
    //       return <button className='submitForm' onClick={async()=>{
    //         await aggregates.submit(
    //           localAddress.LocalAddress,
    //           'BREADDIT', 
    //           {'BREADDITCOMMUNITY': [community, ...communities]}, 
    //           {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
    //         )
    //         window.location.reload()
    //       }}>Following</button>
    //     case false:
    //       return <button className='submitForm' onClick={async()=>{
    //         await aggregates.submit(
    //           localAddress.LocalAddress,
    //           'BREADDIT', 
    //           {'BREADDITCOMMUNITY': [community, ...communities]}, 
    //           {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
    //         )
    //         window.location.reload()
    //       }}>Follow</button>
    //     default:
    //       return <div></div>
    //   }
    // }

  return <div>
    {/* <div className='communityDetails'>
    </div> */}
    {communityResult.item_hash? 
    <div className='userPage'>
      <span className='userID'>{communityResult.content.name}</span>
      <span className='following'>{communityResult.item_hash}</span>
      <span className='following'>{communityResult.content.desc}</span>
      <button className='submitForm'value={isFollowing? 'Following': 'Follow'} onClick={async()=>{
        if(isFollowing){
          console.log(communities)
          const temp = communities.indexOf(community)
          if (temp > -1) {setCommunities(communities.splice(temp, 1))}
          await aggregates.submit(
            localAddress.LocalAddress,
            'BREADDIT', 
            {'BREADDITCOMMUNITY': communities}, 
            {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
          )
          window.location.reload()
        }else{
          console.log(isFollowing)
          await aggregates.submit(
            localAddress.LocalAddress,
            'BREADDIT', 
            {'BREADDITCOMMUNITY': [community, ...communities]}, 
            {'account': localAddress.LocalAlephAccount, 'channel': 'BREADDIT'}
          )
          window.location.reload()}
        }}>{isFollowing? 'Following': 'Follow'}</button>
    </div>:''}
    {result.map((post)=><Post key={post.item_hash} walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>;
}

export default CommunityPage;
