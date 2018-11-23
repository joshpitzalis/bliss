import React, { Component } from 'react';
import './styles.css';
import { auth, googleAuthProvider } from './firebase';
import { interpret } from 'xstate/lib/interpreter';
import { authMachine } from './stateMachine';

class App extends Component {
  state = {
    current: authMachine.initialState
  };

  service = interpret(authMachine).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
    const { send } = this.service;
    // this.unsubscribeFromAuth = 
    auth.onAuthStateChanged(user => {
      if (user) {
        send({
          type: 'SUCCEEDED',
          payload: {
            authenticated: true,
            user
          }
        });
      }
      send({
        type: 'FAILED',
        payload: {
          authenticated: false,
          user: ''
        }
      });
    });
  }

  componentWillUnmount() {
    this.service.stop();
    // this.unsubscribeFromAuth()
  }

  render() {

    const { current } = this.state;
    const { send } = this.service;

    console.log('current.value', current.value)
    return (
      <div className="App">
        <header className="App-header">
          {current.matches('loggedIn') ? (
            <button className="pointer" onClick={() => 
              auth.signOut()
              .then(() => send({
              type: 'LOGGEDOUT',
              payload: {
                authenticated: false,
                user: ''
              }
            }))}>
              Logout
            </button>
          ) : (
            <button
              className="pointer"
              onClick={() => auth.signInWithPopup(googleAuthProvider)}
            >
              Signup/Login
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;

