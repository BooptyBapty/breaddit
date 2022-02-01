import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts'
import CreatePost from './components/CreatePost';

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
    <Router>
      <div className="App">
        <Navbar connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
        <Switch>
          <Route exact path="/">
            <Posts walletAddress={walletAddress} alephAccount={alephAccount}/>
            <CreatePost connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
          </Route>
          <Route path='/createPost'>
            <CreatePost connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
