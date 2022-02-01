import {posts, ethereum} from "aleph-js"
import { useState } from "react"

function CreatePost(props) {

    const [body, setBody] = useState({
        'title':'',
        'body':'',
        'community':'',
        'upvote':0,
        'downvote':0
    });
    const [bodyEmpty, setBodyEmpty] = useState(false)

    const send = async ()=>{
        if(!props.walletAddress) {
            await props.connectWallet()
            await send()
        }
        else if(body.community === '' || body.title === ''){
            setBodyEmpty(true)
        } else{
            setBodyEmpty(false)
            await posts.submit(
                props.alephAccount.address,
                body.community,
                {'body': body
            },
            {
                'account': props.alephAccount,
                'channel': body.community,
                'ref': body.community,
                'api_server': 'https://api2.aleph.im'
            }
            )
        }
    }
    return <div className='createPost'>
        <h3>Create a post</h3>
        <hr></hr>
        <form className="createPostForm">
        {bodyEmpty? <div className="create-error">Please fill required input fields</div>:''}
            <div className="">
                <select className="" value={body.community} onChange={(e)=>{setBody({'title':body.title, 'body':body.body, 'community':e.target.value,'downvote':body.downvote, 'upvote':body.upvote})}} required>
                    <option> Choose a community </option>
                    <option value="TestSubreddit"> TestSubreddit </option>
                    <option value="TestSubreddit2"> TestSubreddit2 </option>
                </select><br></br>
            </div>
            <div className="text-fields">
                <input className="" type="text" value={body.title} placeholder="Title" onChange={(e)=>{setBody({'title':e.target.value, 'body':body.body, 'community':body.community,'downvote':body.downvote, 'upvote':body.upvote})}} required></input>
                <textarea className="" placeholder="Text (optional)" value={body.body} onChange={(e)=>{setBody({'title':body.title, 'body':e.target.value, 'community':body.community,'downvote':body.downvote, 'upvote':body.upvote})}}></textarea>
            <button className="" type="button" onClick={async()=>{send()}} value="Post">Post</button>
            </div>
        </form>
    </div>;
}

export default CreatePost;
