import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Spinner from 'react-spinkit'
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Chart from './Chart';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './components/firebase';
import Login from './Login';


function App() {

  const [user, loading] = useAuthState(auth);
  if (loading){
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://image.flaticon.com/icons/png/512/2111/2111615.png" alt="" />

          <Spinner 
            name= 'ball-spin-fade-loader'
            color= 'purple'
            fadeIn= 'none'

          />
        </AppLoadingContents>
      </AppLoading>
    )
  }
  return (
    <div className="app">
      <Router>
        {!user? (
          <Login />
        )
        :
        (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                <Chart />
              </Route>
            </Switch>
          </AppBody>
        </>
        )
      }
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div `
  display: flex;
  height: 100vh;
`
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;

  }
`