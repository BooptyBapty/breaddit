import { posts, ethereum } from 'aleph-js'

function Navbar(props) {

  const cum = async ()=>{
    await posts.submit(
      props.alephAccount.address,
      'mytype',
      {'body': 'test post written from my ass'},
      {
        'account': props.alephAccount,
        'channel': 'TEST',
        'api_server': 'https://api2.aleph.im'
      }
     )
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Reddit Clone</a>
        {
          props.walletAddress ?
          props.walletAddress
          :
          <a className="btn btn-primary text-right" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</a>
        }

        <a className="btn btn-success" onClick={async()=>{cum()}}>Make a post</a>

    </nav>
  );
}

export default Navbar;
