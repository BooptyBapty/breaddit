function Navbar(props) {

  return (
    <nav className="">
        <a className="font-bold underline" href="#">Reddit Clone</a>
        <div className='col'></div>
        {
          props.walletAddress ?
          <a className="" href="#">{props.walletAddress}</a>
          :
          <a className="" aria-current="page" href="#" onClick={async()=>{props.connectWallet()}}>Connect Wallet</a>
        }
    </nav>
  );
}

export default Navbar;
