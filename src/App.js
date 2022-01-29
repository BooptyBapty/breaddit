import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App(props) {

  const [web3, setWeb3] = useState()
  const [alephAccount, setAlephAccount] = useState()
  const [walletAddress, setWalletAddress] = useState()

  const connectWallet = async (e) => {
    const { alephAccount, web3 } = await props.connectWeb3(e)
    const accounts = await web3.eth.getAccounts()

    setWeb3(web3)
    setAlephAccount(alephAccount)
    setWalletAddress(accounts[0])
  }

  useEffect(() => {
    if (window.ethereum.isConnected()) {
      connectWallet()
    }
  }, [])

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
    </div>
  );
}

export default App;
