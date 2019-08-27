import React from 'react';
import PropTypes from 'prop-types'

import './TaskForm.scss';

class TaskForm extends React.Component {
  state = {
    description: ''
  }

  handleChange = (event) => {
    this.setState({ description: event.target.value })
  }

  onFormSubmit = (event) => {
    this.props.handleSubmit(this.state.description)
    this.setState({ description: '' })
    event.preventDefault()
  }

  render() {
    return (
      <div className="taskForm">
        <div className="ui attached segment">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label> What do you want to do?</label>
              <input type="text" value={this.state.description} onChange={this.handleChange} />
            </div>
            <div className="submitButton">
              <button className="ui button" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

TaskForm.propTypes = {
  handleSubmit: PropTypes.func
}

TaskForm.defaultProps = {
  handleSubmit: () => { }
}

export { TaskForm }