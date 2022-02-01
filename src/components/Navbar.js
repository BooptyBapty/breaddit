import { Link } from 'react-router-dom'
import RedditLogo from '../icons/redditlogo.png'
import Plus from '../icons/plus.svg'

function Navbar(props) {

  return (
    <nav className="bg-white w-screen border-b navbar">
        <Link className="logo" to='/'><img className="logo-img" src={RedditLogo} alt='reddit logo'></img></Link>
        <div className='navbar-right'>
          <Link to='/createPost'><img src={Plus}></img></Link>
          {
            props.walletAddress ?
            <button className="account" href="#">{props.walletAddress}</button>
            :
            <button className="account account-btn border" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</button>
          }
        </div>
    </nav>
  );
}

export default Navbar;
