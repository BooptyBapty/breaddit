function Navbar(props) {

  return (
    <nav className="navbar fixed-top container">
        <a className="navbar-brand col-md-2" href="#">Reddit Clone</a>
        <div className='col'></div>
        {
          props.walletAddress ?
          <a className="btn" href="#">{props.walletAddress}</a>
          :
          <a className="btn btn-outline-danger col-md-2" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</a>
        }
    </nav>
  );
}

export default Navbar;
