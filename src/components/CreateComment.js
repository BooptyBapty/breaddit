import React, { useState, useEffect } from "react"
import {posts} from "aleph-js"

// walletAddress
// post_hash

function CreateComment(props) {
    const [body, setBody] = useState('');
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }else{
            posts.submit(
                props.alephAccount.address,
                'BREADDITCOMMENT',
                {'body': body
            },
            {
                'account': props.alephAccount,
                'channel': 'BREADDIT',
                'ref': props.post_hash,
                'api_server': 'https://api2.aleph.im'
            }
            ).catch(error=>{
                console.log('couldnt post' + error);
            })
        }
    }
    const checkLoggedin = ()=>{
        if(!props.walletAddress) {} else{
            setIsLoggedIn(true)
        }
    }
    useEffect(()=>{
        checkLoggedin()
    },[])
  return <div>
        {isLoggedIn? <form className="createPostForm">
            <input type='text' value={body} placeholder="Post a comment" onChange={(e)=>{
                setBody(e.target.value)
                if(e.target.value.length === 0) {setBodyEmpty(true)} else setBodyEmpty(false)
                }}></input>
            <button type="button" onClick={()=>{send()}} disabled={bodyEmpty}>Post</button>
        </form>:''
        }
  </div>;
}

export default CreateComment;
