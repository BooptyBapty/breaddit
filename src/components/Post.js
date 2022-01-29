import {posts, ethereum} from "aleph-js"

function Post(props) {
    const send = async ()=>{
        await posts.submit(
        props.alephAccount.address,
        'mytype',
        {'body': 'test post written from my ass'},
        {
            'account': props.alephAccount,
            'channel': 'TST',
            'api_server': 'https://api2.aleph.im'
        }
        )
    }
    return <div className='container clearfix'>
        <form>
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname"></input>
            <input type="submit" onClick={async()=>{send()}}></input>
        </form>
    </div>;
}

export default Post;
