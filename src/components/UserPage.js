import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { aggregates, posts } from 'aleph-js'
import Loading from './Loading'
import Post from './Post';
import tempProfile from './../icons/pfp.jpg'

function UserPage(props) {

    const { account } = useParams()
    const [accountRes, setAccountRes] = useState({});
    const [result, setResult] = useState([{}]);
    const [followingLengthOne, setFollowingLengthOne] = useState(false);

    const load = async ()=>{
      if(!props.walletAddress){props.connectWallet()}
      const res = await aggregates.fetch_one(account, 'BREADDIT')
      setAccountRes(res)
      if(res.BREADDITCOMMUNITY.length === 1) setFollowingLengthOne(true)
      const postResult = await posts.get_posts('BREADDITPOST', {addresses:[account]})
      setResult(postResult.posts)
    }

    useEffect(()=>{
      load()
    },[])

  return <React.Fragment>
  {!accountRes.BREADDITCOMMUNITY? <Loading/>: <div>
  <div className='userPage'>
    <img className='userPicture' src={tempProfile} alt='profilePicture'/>
    <span className='userID' >{account}</span> 
    <span className='following'>Following {accountRes.BREADDITCOMMUNITY.length} communities</span>
      {followingLengthOne?<span className='followingCommunity'>{accountRes.BREADDITCOMMUNITY}</span>
      :<div className='followingCommunities'>
        {accountRes.BREADDITCOMMUNITY.map((n)=>{<span className='followingCommunity'>{n}</span>})}
      </div>
      }
  </div>
  <div>
    {result.map((post)=><Post key={post.item_hash} walletAddress={props.walletAddress} alephAccount={props.alephAccount} result={post}/>)}
  </div>
  </div>}
  </React.Fragment>
}

export default UserPage;
