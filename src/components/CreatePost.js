import {posts} from "aleph-js"
import React, { useState } from "react"
import Loading from './Loading'

function CreatePost(props) {

    const [body, setBody] = useState({
        'title':'',
        'body':'',
    });
    const [bodyEmpty, setBodyEmpty] = useState(true)
    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }
        else if(body.community === '' || body.title === ''){
            setBodyEmpty(true)
        } else{
            setBodyEmpty(false)
            props.setIsLoading(true)
            posts.submit(
                props.alephAccount.address,
                'BREADDITPOST',
                {'body': body
            },
            {
                'account': props.alephAccount,
                'channel': 'BREADDIT',
                'ref': body.community,
                'api_server': 'https://api2.aleph.im'
            }
            ).catch((error)=>{
                props.setIsLoading(false)
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
                    <select className="" value={body.community} onChange={(e)=>{
                        setBody({
                            'title':body.title,
                            'body':body.body,
                            'community':e.target.value})
                            if(e.target.value === 'Choose a community'){
                                setBodyEmpty(true)
                            }else if(e.target.value.length>0 && body.title.length>0) setBodyEmpty(false)}} required>
                        <option value='' disabled selected> Choose a community </option>
                        <option value="TestSubreddit"> TestSubreddit </option>
                        <option value="TestSubreddit2"> TestSubreddit2 </option>
                    </select>
                    <div className="text-fields">
                        <input className="" type="text" value={body.title} placeholder="Title" onChange={(e)=>{
                            setBody({
                                'title':e.target.value,
                                'body':body.body,
                                'community':body.community})
                                if(e.target.value.length === 0){
                                    setBodyEmpty(true)
                                }else if(e.target.value.length>0 && body.community.length>0)setBodyEmpty(false)}} required></input>
                        <textarea className="" placeholder="Text (optional)" value={body.body} onChange={(e)=>{setBody({'title':body.title, 'body':e.target.value, 'community':body.community,'downvote':body.downvote, 'upvote':body.upvote})}}></textarea>
                    <button disabled={bodyEmpty} className="" type="button" onClick={async()=>{send()}} value="Post">Post</button>
                    </div>
                </form>
            </React.Fragment>}
    </div>;
}

export default CreatePost;
