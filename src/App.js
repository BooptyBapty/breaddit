import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Modal from 'react-modal'
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts'
import CreatePost from './components/CreatePost';
import { buildQueries } from '@testing-library/react';

function App(props) {

  const [web3, setWeb3] = useState()
  const [alephAccount, setAlephAccount] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [createPostModal, setCreatePostModal] = useState(false);

  const modalStyle = {
    content:{
      'background-color': 'rgb(219,224,231)',
      'display': 'flex',
      'justify-content': 'center',
      'align-items':'center',
      'width': 'fit-content',
      'height': 'fit-content',
      'padding': '20px',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)'
    },
    overlay:{
      'background-color': 'rgb(0,0,0, 0.6)'
    }
  }

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
        <Navbar connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
        <Modal style={modalStyle} portalClassName="modal" isOpen={createPostModal} onRequestClose={()=>{setCreatePostModal(false)}}>
          <CreatePost connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
        </Modal>
        <Switch>
          <Route exact path="/">
            <Posts walletAddress={walletAddress} alephAccount={alephAccount}/>
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
