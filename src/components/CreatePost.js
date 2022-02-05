import {posts} from "aleph-js"
import React, { useState } from "react"
import Loading from './Loading'

function CreatePost(props) {

    const [body, setBody] = useState({
        'title':'',
        'body':'',
    })
    const [communityHash, setCommunityHash] = useState('');
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }
        else if(communityHash === '' || body.title === ''){
            setBodyEmpty(true)
        } else{
            setBodyEmpty(false)
            props.setIsLoading(true)
            await posts.submit(
                props.alephAccount.address,
                'BREADDITPOST',
                {'body': body
            },
            {
                'account': props.alephAccount,
                'channel': 'BREADDIT',
                'ref': communityHash,
                'api_server': 'https://api2.aleph.im'
            }
            ).then((res)=>{
                console.log(res);
                props.setIsLoading(false)
                window.location.href = `/post/${res.item_hash}`
            }).catch((error)=>{
                props.setIsLoading(false)
                console.error(error)
            })
        }
    }
    return <div className='createPost'>
        {props.isLoading? <div className="createPost-load">
                <Loading/>
                <span className="loading-text">Waiting for wallet signature</span>
            </div>
            :<React.Fragment>
                <h3>Create a post</h3>
                <hr></hr>
                <form className="createPostForm">
                    <input required placeholder="Community Hash" className="" value={communityHash} onChange={(e)=>{
                        setCommunityHash(e.target.value)
                        if(e.target.value === ''){
                            setBodyEmpty(true)
                        }else if(e.target.value.length>0 && body.title.length>0) setBodyEmpty(false)}}></input>
                    <div className="text-fields">
                        <input className="" type="text" value={body.title} placeholder="Title" onChange={(e)=>{
                            setBody({
                                'title':e.target.value,
                                'body':body.body})
                                if(e.target.value.length === 0){
                                    setBodyEmpty(true)
                                }else if(e.target.value.length>0 && communityHash.length>0)setBodyEmpty(false)}} required></input>
                        <textarea className="" placeholder="Text (optional)" value={body.body} onChange={(e)=>{setBody({'title':body.title, 'body':e.target.value})}}></textarea>
                    <button disabled={bodyEmpty} className="" type="button" onClick={async()=>{send()}} value="Post">Post</button>
                    </div>
                </form>
            </React.Fragment>}
    </div>;
}

export default CreatePost;
