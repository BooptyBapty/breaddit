import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Modal from 'react-modal'
import './App.css';
import Nav from './components/Nav';
import Posts from './components/Posts'
import CreatePost from './components/CreatePost';


function App(props) {

  const [web3, setWeb3] = useState()
  const [alephAccount, setAlephAccount] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [createPostModal, setCreatePostModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalStyle = {
    content:{
      'backgroundColor': '#1d1e2b',
      'borderRadius': '5px',
      'border': '0px',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems':'center',
      'width': 'fit-content',
      'height': 'fit-content',
      'padding': '40px 20px',
      'overflow':'hidden',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)'
    },
    overlay:{
      'backgroundColor': 'rgb(0,0,0, 0.4)'
    }
  }

  const connectWallet = async (e) => {
    const { alephAccount, web3 } = await props.connectWeb3(e)
    const accounts = await web3.eth.getAccounts()

    setWeb3(web3)
    setAlephAccount(alephAccount)
    setWalletAddress(accounts[0])
  }

  return (
    <Router>
      <div className="App">
        <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
        <Modal ariaHideApp={false} style={modalStyle} isOpen={createPostModal} onRequestClose={()=>{setCreatePostModal(false)}}>
          <CreatePost isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
        </Modal>
        <Switch>
          <Route exact path="/">
            <Posts setIsLoading={setIsLoading} setCreatePostModal={setCreatePostModal} walletAddress={walletAddress} alephAccount={alephAccount}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
