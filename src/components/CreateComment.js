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
            ).then(()=>{
                window.location.href=`/post/${props.post_hash}`
            }).catch(error=>{
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
  return <React.Fragment>
        {isLoggedIn? <form className="createCommentForm">
            <textarea type='text' value={body} placeholder="Post a comment" onChange={(e)=>{
                setBody(e.target.value)
                if(e.target.value.length === 0) {setBodyEmpty(true)} else setBodyEmpty(false)
                }}></textarea>
            <button className="submitForm" type="button" onClick={()=>{send()}} disabled={bodyEmpty}>POST</button>
        </form>:''
        }
  </React.Fragment>;
}

export default CreateComment;
