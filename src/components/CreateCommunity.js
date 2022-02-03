import React, {useState, useEffect} from 'react';
import { posts } from 'aleph-js'

function CreateCommunity(props) {
    const [name, setName] = useState('');
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }else{
            posts.submit(
                props.alephAccount.address,
                'BREADDITCOMMUNITY',
                {'name': name
            },
            {
                'account': props.alephAccount,
                'channel': 'BREADDIT',
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
    return <React.Fragment>
                {isLoggedIn? <form className="createCommentForm">
                    <input type='text' value={name} placeholder="Post a comment" onChange={(e)=>{
                        setName(e.target.value)
                        if(e.target.value.length === 0) {setBodyEmpty(true)} else setBodyEmpty(false)
                        }}></input>
                    <button type="button" onClick={()=>{send()}} disabled={bodyEmpty}>Create Community</button>
                </form>:''
                }
            </React.Fragment>;
}

export default CreateCommunity;
