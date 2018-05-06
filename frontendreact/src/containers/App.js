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

const store = configureStore()

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
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
