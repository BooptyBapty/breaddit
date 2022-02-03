import { Link } from 'react-router-dom';
import Pfp from '../icons/pfp.jpg';
import UserPage from './UserPage';

function Nav(props) {

  return (
    <nav className="nav">
        <Link className="app-name" to='/'>Web3 Forum</Link>
          {
            props.walletAddress ? <div className='profile-options'>
              <Link className='profile-link' to={`/user/${props.walletAddress}`}>
                <div className='profile'>
                  <img className='pfp' src={Pfp} alt='profile'></img>
                  <button className="account" href="#">{props.walletAddress.slice(0,7) + `...` + props.walletAddress.slice(props.walletAddress.length - 6, props.walletAddress.length)}</button>
                </div>
              </Link>
              <hr/>
              <button className='create-button' onClick={()=>props.setCreatePostModal(true)}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg></button>
            </div>
            :
            <button className="account account-btn" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</button>
          }
    </nav>
  );
}

export default Nav;
