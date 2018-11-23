import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, googleAuthProvider } from './firebase';

class App extends Component {
  state = {
    user: ''
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user }));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.user ? (
            <button onClick={() => auth.signOut()}>Logout</button>
          ) : (
            <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
              Signup/Login
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
