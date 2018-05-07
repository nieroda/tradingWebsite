import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './navbar.js'
import Homepage from '../components/Homepage'
import viewTrades from '../components/viewTrades'
import newTrade from '../components/newTrade'
import myTrades from '../components/myTrades'
import SignIn from '../components/signIn'
import SignInComplete from '../components/signincomplete'
import jwtDecode from 'jwt-decode'

import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth'

const store = configureStore()


if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}))
  }
}



class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="onboarding">
            <NavBar />
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/main' component={viewTrades} />
              <Route exact path='/newtrade' component={newTrade} />
              <Route exact path='/mytrades' component={myTrades} />
              <Route exact path='/signIn'   component={() => window.location = 'http://localhost:1337/auth/steam'} />
              <Route exact path='/finishedSignin' component={SignInComplete} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
