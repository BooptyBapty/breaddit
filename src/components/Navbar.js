import RedditLogo from '../icons/redditlogo.png'

function Navbar(props) {

  return (
    <nav className="bg-white w-screen border-b navbar">
        <a className="logo" href="#"><img className="logo-img" src={RedditLogo} alt='reddit logo'></img></a>
        {
          props.walletAddress ?
          <button className="account" href="#">{props.walletAddress}</button>
          :
          <button className="account account-btn border" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</button>
        }
    </nav>
  );
}

export default Navbar;
