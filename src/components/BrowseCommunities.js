import React, {useState, useEffect} from 'react';
import { posts } from 'aleph-js'
import { Link } from 'react-router-dom'
import Loading from './Loading';

function BrowseCommunities(props) {

    const [result, setResult] = useState([{}]);

    const load = async()=>{
        await props.connectWallet()
        const res = await posts.get_posts('BREADDITCOMMUNITY')
        setResult(res.posts)
    }

    useEffect(()=>{
        load()
    },[])

  return <div>
      {result.map((post)=><Link to={`/community/${post.item_hash}`}>{post.content?
    <div className='followingCommunity noUnderline'>
    <span className='userID'>{post.content.name}</span><br/>
    <span className='comment-body'>{post.item_hash}</span>
    </div>:<Loading/>}</Link>)}
  </div>;
}

export default BrowseCommunities;
