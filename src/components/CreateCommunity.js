import React, {useState, useEffect} from 'react';
import { posts, store } from 'aleph-js'

function CreateCommunity(props) {
    const [name, setName] = useState('');
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const [communityPhoto, setCommunityPhoto] = useState(undefined);
    const [communityDesc, setCommunityDesc] = useState('');
    const [createdCommunity, setCreatedCommunity] = useState(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }else{
            if(communityPhoto !== undefined) {
                const res = store.submit(props.walletAddress, {
                fileobject:communityPhoto,
                storage_engine:'ipfs',
                channel:'BREADDIT',
                account:props.alephAccount
            })
            await posts.submit(
                props.alephAccount.address,
                'BREADDITCOMMUNITY',
                {'name': name,
                'img':res.item_hash,
                'desc':communityDesc
            },
            {
                'account': props.alephAccount,
                'channel': 'BREADDIT',
                'api_server': 'https://api2.aleph.im'
            }
            ).catch(error=>{
                console.log('couldnt post' + error);
            })
            }else{
                const res = await posts.submit(
                    props.alephAccount.address,
                    'BREADDITCOMMUNITY',
                    {'name': name,
                    'desc':communityDesc
                },
                {
                    'account': props.alephAccount,
                    'channel': 'BREADDIT',
                    'api_server': 'https://api2.aleph.im'
                }
                ).catch(error=>{
                    console.log('couldnt post' + error);
                }) 
                setCreatedCommunity(res.item_hash)
                console.log(res)
            }
        }
    }
    const checkLoggedin = async ()=>{
        if(!props.walletAddress) {} else{
            setIsLoggedIn(true)
        }
    }
    useEffect(()=>{
        checkLoggedin()
    },[])
    return <React.Fragment>
{isLoggedIn? <React.Fragment>
    <form className="createCommentForm">
        <input required type='text' value={name} placeholder="Name your community" onChange={(e)=>{
            setName(e.target.value)
            if(e.target.value.length === 0) {setBodyEmpty(true)} else setBodyEmpty(false)
            }}></input>
        <input value={communityPhoto} type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
            setCommunityPhoto(e.target.value)
        }}></input>
        <textarea required value={communityDesc} placeholder='Community description' onChange={(e)=>{
            setCommunityDesc(e.target.value)
        }}></textarea>
        <button type="button" onClick={()=>{send()}} disabled={bodyEmpty}>Create Community</button>
    </form>
{createdCommunity? <span> Your community hash: {createdCommunity}</span>:''}
</React.Fragment>:''
}
</React.Fragment>;
}

export default CreateCommunity;
