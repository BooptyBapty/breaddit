import { useState } from 'react';
import { aggregates } from 'aleph-js';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Modal from 'react-modal'
import './App.css';
import Nav from './components/Nav';
import Posts from './components/Posts'
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import UserPage from './components/UserPage';
import CreateCommunity from './components/CreateCommunity';
import CommunityPage from './components/CommunityPage';
import BrowseCommunities from './components/BrowseCommunities';
import NotFound404 from './components/NotFound404';


function App(props) {

  const [web3, setWeb3] = useState()
  const [alephAccount, setAlephAccount] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [createPostModal, setCreatePostModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalStyle = {
    content:{
      'backgroundColor': '#214a4d',
      'borderRadius': '15px',
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
      'backgroundColor': 'rgb(0,0,0, 0.6)'
    }
  }

  const connectWallet = async (e) => {
    try{
      const { alephAccount, web3 } = await props.connectWeb3(e)
      const accounts = await web3.eth.getAccounts()
  
      await aggregates.fetch_one(accounts[0], 'BREADDIT').catch(async(e)=>{
          console.log(e);
          await aggregates.submit(
            accounts[0],
            'BREADDIT',
            {'BREADDITCOMMUNITY':[]},
            {account:alephAccount}
          )
      })
  
      setWeb3(web3)
      setAlephAccount(alephAccount)
      setWalletAddress(accounts[0])

      return {
        WalletAddress: accounts[0],
        AlephAccount: alephAccount
      }
    }catch(e){
      console.log(e);
    }

  }

  return (
    <Router>
      <div className="App">
        <Modal ariaHideApp={false} style={modalStyle} isOpen={createPostModal} onRequestClose={()=>{setCreatePostModal(false)}}>
          <CreatePost isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount}/>
        </Modal>
        <Switch>
          <Route exact path="/">
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <Posts connectWallet={connectWallet} setIsLoading={setIsLoading} setCreatePostModal={setCreatePostModal} walletAddress={walletAddress} alephAccount={alephAccount}/>
          </Route>
          <Route exact path='/post/:item_hash'>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <PostPage walletAddress={walletAddress} alephAccount={alephAccount} connectWallet={connectWallet}/>
          </Route>
          <Route exact path='/user/:account'>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <UserPage connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} />
          </Route>
          <Route exact path='/CreateCommunity'>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <CreateCommunity walletAddress={walletAddress} alephAccount={alephAccount} connectWallet={connectWallet}/>
          </Route>
          <Route exact path='/community/:community'>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <CommunityPage walletAddress={walletAddress} alephAccount={alephAccount} connectWallet={connectWallet}/>
          </Route>
          <Route exact path='/browsecommunities'>
            <Nav isLoading={isLoading} setIsLoading={setIsLoading} connectWallet={connectWallet} walletAddress={walletAddress} alephAccount={alephAccount} setCreatePostModal={setCreatePostModal}/>
            <BrowseCommunities connectWallet={connectWallet}/>
          </Route>
          <Route exact path='/404'>
            <NotFound404 connectWallet={connectWallet}/>
          </Route>
          <Redirect to='/404'/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
