import React from 'react';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';

export 

export const const authMachine = Machine({
  id: 'auth',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

class Toggle extends Component {
  state = {
    current: toggleMachine.initialState
  };

  service = interpret(toggleMachine)
    .onTransition(current => this.setState({ current }));

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { current } = this.state;
    const { send }  this.service;

    return (
      <button onClick={() => send('TOGGLE')}>
        {current.matches('inactive') ? 'Off' : 'On'}
      </button>
    )
  }
}