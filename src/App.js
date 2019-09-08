import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

import './App.scss'
import { ToDo } from './components/to-do'
import { Login } from './components/login'
import Auth from './utils/Auth'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="menu">
            <div className="ui secondary vertical pointing menu">
              <Link className="item" to="/">Home</Link>
              <Link className="item" to="/todo">To Do</Link>
              <div className="item">
                <LogoutButton />
              </div>
            </div>
          </div>
          <div className="main">
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/todo" component={ToDo} />
          </div>
        </div>
      </Router>
    )
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  const renderCompOrRedirect = props => {
    if (Auth.isAuthenticated()) {
      return (
        <Component {...props} />
      )
    } else {
      return (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
          }} />
      )
    }
  }

  return (
    <Route {...rest} render={renderCompOrRedirect} />
  )
}

const LogoutButton = withRouter(({ history }) => {
  const handleLogoutClick = () => {
    Auth.logout()
    history.push('/')
  }
  if (Auth.isAuthenticated()) {
    return (
      <button onClick={handleLogoutClick}>Logout</button>
    )
  } else {
    return <div>logged out</div>
  }
})

function Home() {
  return <h3>Welcome Home</h3>
}

export default App