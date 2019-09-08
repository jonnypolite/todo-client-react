import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../utils/Auth'

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onFormSubmit = async (event) => {
    event.preventDefault()

    const loginResponse = await Auth.login(
      this.state.username,
      this.state.password
    )

    // redirect if it worked, show error if not
    if (loginResponse.success) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className="loginForm">
        <h1 className="ui header">Authentication Required</h1>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>username</label>
            <input
              name="username"
              type="text"
              value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className="field">
            <label>password</label>
            <input
              name="password"
              type="password"
              value={this.state.password} onChange={this.handleChange} />
          </div>
          <button className="ui button" type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export { Login }