import {posts, ethereum} from "aleph-js"

function Post(props) {
    const send = async (channel, body)=>{
        await posts.submit(
        props.alephAccount.address,
        'mytype',
        {'body': body},
        {
            'account': props.alephAccount,
            'channel': channel,
            'api_server': 'https://api2.aleph.im'
        }
        )
    }
    return <div className='container clearfix'>
        <form>
            <select>
                <option value="test"> test </option>
                <option value="test2"> test2 </option>
            </select><br></br>
            <input type="text" name="title"></input><br></br>
            <input type="textarea" name="text(optional)"></input><br></br>
            <input type="submit" onClick={async()=>{send()}} value="Post"></input>
        </form>
    </div>;
}

export default Post;
