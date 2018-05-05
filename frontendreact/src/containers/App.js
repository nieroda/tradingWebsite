import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './navbar.js'
import Homepage from '../components/Homepage'
import viewTrades from '../components/viewTrades'

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
              <Route path='/main' component={viewTrades} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
