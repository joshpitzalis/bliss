import { Machine,actions } from 'xstate';
const { assign } = actions;


const handleSignIn = assign({
  user: (ctx, event) => event.payload
});

export const authMachine = Machine({
  id: 'auth',
  initial: 'loggedOut',
  context: {
    user: ''
  },
  states: {
    loggedOut: {
      on: { 
        SUCCEEDED: {
          target: 'loggedIn',
          actions: 'handleSignIn'
        },
        FAILED: {
          target: 'loggedOut',
          actions: 'handleSignIn'
        }
      }
    },
    loggedIn: {
      on: { LOGGEDOUT: 'loggedOut' }
    },
  },
},
{
  actions:{handleSignIn}
});
