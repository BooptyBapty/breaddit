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
        else if(body.community === '' || body.title === '' || body.body === ''){
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
                'api_server': 'https://api2.aleph.im'
            }
            )
        }
    }
    return <div className='createPost bg-white border border-radius-lg'>
        <form className="createPostForm">
            <div className="">
                <select className="" value={body.community} onChange={(e)=>{setBody({'title':body.title, 'body':body.body, 'community':e.target.value,'downvote':body.downvote, 'upvote':body.upvote})}} required>
                    <option> Please select subreddit </option>
                    <option value="TestSubreddit"> TestSubreddit </option>
                    <option value="TestSubreddit2"> TestSubreddit2 </option>
                </select><br></br>
            </div>
            <input className="" type="text" value={body.title} placeholder="Title" onChange={(e)=>{setBody({'title':e.target.value, 'body':body.body, 'community':body.community,'downvote':body.downvote, 'upvote':body.upvote})}} required></input><br></br>
            {/* <div className="">
                <label>Type of Post</label>
                <select className="" value={type} onChange={(e)=>{setType(e.target.value)}} required>
                    <option value="text"> Text </option>
                    <option value="content"> Media </option>
                    <option value="link"> Link </option>
                </select><br></br>
            </div> */}
            <textarea className="" placeholder="Text (optional)" value={body.body} onChange={(e)=>{setBody({'title':body.title, 'body':e.target.value, 'community':body.community,'downvote':body.downvote, 'upvote':body.upvote})}}></textarea><br></br>
            <button className="" type="button" onClick={async()=>{send()}} value="Post">Post</button>
        </form>
        {bodyEmpty? <p>Please fill all input fields</p>:''}
    </div>;
}

export default CreatePost;
