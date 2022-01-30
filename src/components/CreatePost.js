import {posts, ethereum} from "aleph-js"
import { useState } from "react"

function CreatePost(props) {

    const [community, setCommunity] = useState("");
    const [type, setType] = useState("");
    const [body, setBody] = useState({
        'title':'',
        'body':'',
        'upvote':0,
        'downvote':0
    });

    const send = async ()=>{
        await posts.submit(
        props.alephAccount.address,
        community,
        {'body': body
    },
        {
            'account': props.alephAccount,
            'channel': community,
            'api_server': 'https://api2.aleph.im'
        }
        )
    }
    return <div className='container clearfix'>
        <form className="container">
            <div className="form-group">
                <label>Select Community</label>
                <select className="form-control" value={community} onChange={(e)=>{setCommunity(e.target.value)}} required>
                    <option> TEST </option>
                    <option> TEST2 </option>
                </select><br></br>
            </div>
            <input className="form-control" type="text" value={body.title} placeholder="Title" onChange={(e)=>{setBody({'title':e.target.value, 'body':body.body})}} required></input><br></br>
            <div className="form-group">
                <label>Type of Post</label>
                <select className="form-control" value={type} onChange={(e)=>{setType(e.target.value)}} required>
                    <option value="text"> Text </option>
                    <option value="content"> Media </option>
                    <option value="link"> Link </option>
                </select><br></br>
            </div>
            <textarea className="form-control" placeholder="Text (optional)" value={body.body} onChange={(e)=>{setBody({'title':body.title, 'body':e.target.value})}}></textarea><br></br>
            <input className="btn btn-secondary float-end" type="submit" onClick={async()=>{send()}} value="Post"></input>
        </form>
    </div>;
}

export default CreatePost;
