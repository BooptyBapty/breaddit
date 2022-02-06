import { Link } from 'react-router-dom';

function Nav(props) {

  return (
    <nav className="nav">
        <Link className="app-name" to='/'>BREADDIT</Link>
          {
            props.walletAddress ? <div className='profile-options'>
              <Link className='profile-link' to={`/user/${props.walletAddress}`}>
                <div className='profile'>
                  <img className='pfp' src={`https://robohash.org/${props.walletAddress}.png?bgset=bg1`} alt='profile'></img>
                  <button className="account" href="#">{props.walletAddress.slice(0,7) + `...` + props.walletAddress.slice(props.walletAddress.length - 6, props.walletAddress.length)}</button>
                </div>
              </Link>
              <hr/>
              <div className='nav-buttons'>
                <button className='create-button' onClick={()=>props.setCreatePostModal(true)}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg></button>
                <Link className='create-button1' to='/CreateCommunity'><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px"><path className="cls-1" d="M448,191.71H435.2v-89.6a64,64,0,0,0-64-64H64a64,64,0,0,0-64,64V379.16A17.78,17.78,0,0,0,17.92,397a17.42,17.42,0,0,0,12.45-5.25L76.8,345.31H179.2v12.8a64,64,0,0,0,64,64h192l46.42,46.51a17.42,17.42,0,0,0,12.46,5.26A17.78,17.78,0,0,0,512,456.06V255.71A64,64,0,0,0,448,191.71Zm-268.8,64v64H66.2l-7.5,7.5-33.1,33.1V102.11A38.44,38.44,0,0,1,64,63.71H371.2a38.44,38.44,0,0,1,38.4,38.4v89.6H243.2A64,64,0,0,0,179.2,255.71Zm307.2,51v130.5L453.32,404l-7.5-7.52H243.2a38.44,38.44,0,0,1-38.4-38.4V255.71a38.44,38.44,0,0,1,38.4-38.4H448a38.44,38.44,0,0,1,38.4,38.4Zm-89.6-38.16a12.8,12.8,0,0,1-12.8,12.8H307.2a12.8,12.8,0,1,1,0-25.6H384A12.8,12.8,0,0,1,396.8,268.51Zm0,38.4a12.8,12.8,0,0,1-12.8,12.8H307.2a12.8,12.8,0,1,1,0-25.6H384A12.8,12.8,0,0,1,396.8,306.91Zm0,38.4a12.8,12.8,0,0,1-12.8,12.8H307.2a12.8,12.8,0,1,1,0-25.6H384A12.8,12.8,0,0,1,396.8,345.31Z"/></svg></Link>
                {/* <Link to='/community/ee48adeeac1e149ab0dc58e7aa04bd82ec8f096bde342be789b02d78b0763e37'>go to BreadditTest</Link> */}
              </div>
            </div>
            :
            <button className="account account-btn" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</button>
          }
    </nav>
  );
}

export default Nav;
