function Navbar(props) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Reddit Clone</a>
        {
          props.walletAddress ?
          props.walletAddress
          :
          <a className="btn btn-primary text-right" aria-current="page" href="#" onClick={props.connectWallet}>Connect Wallet</a>
        }
    </nav>
  );
}

export default Navbar;
