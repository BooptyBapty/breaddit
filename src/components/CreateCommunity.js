import React, {useState, useEffect} from 'react';
import { posts, store } from 'aleph-js'

function CreateCommunity(props) {
    const [name, setName] = useState('');
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const [communityPhoto, setCommunityPhoto] = useState(undefined);
    const [communityDesc, setCommunityDesc] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }else{
            if(communityPhoto !== undefined) {
                const res = store.submit(props.walletAddress, {
                fileobject:communityPhoto,
                // storage_engine:'ipfs',
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
            ).then((res)=>{
                const tempURL = window.location.href
                window.location.href = `${tempURL.substring(0, tempURL.lastIndexOf('/'))}/community/${res.item_hash}`
            }).catch(error=>{
                console.log('couldnt post' + error);
            })
            }else{
                await posts.submit(
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
                ).then((res)=>{
                    const tempURL = window.location.href
                    window.location.href = `${tempURL.substring(0, tempURL.lastIndexOf('/'))}/community/${res.item_hash}`
                }).catch(error=>{
                    console.log('couldnt post' + error);
                })
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
    <form className="createCommunityForm">
        <input required type='text' value={name} className='communityName' placeholder="Name your community" onChange={(e)=>{
            setName(e.target.value)
            if(e.target.value.length === 0) {setBodyEmpty(true)} else setBodyEmpty(false)
            }}></input>
        <input value={communityPhoto} type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
            setCommunityPhoto(e.target.value)
        }}></input>
        <textarea required value={communityDesc} className='textareaForm' placeholder='Community description' onChange={(e)=>{
            setCommunityDesc(e.target.value)
        }}></textarea>
        <button className='submitForm' type="button" onClick={()=>{send()}} disabled={bodyEmpty}>Create Community</button>
    </form>
</React.Fragment>:''
}
</React.Fragment>;
}

export default CreateCommunity;
