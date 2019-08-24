import React from 'react';
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import './TaskForm.scss';

class TaskForm extends React.Component {
  state = {
    description: ''
  }

  handleChange = (event) => {
    this.setState({ description: event.target.value })
  }
  onCancelClick = () => {
    this.setState({ description: '' })
  }

  onFormSubmit = () => {
    this.props.handleUpdate(this.props.taskData.id, this.state.description)
    this.setState({ editing: false })
  }

  render() {
    return (
      <div className="taskForm">
        <div className="ui attached segment">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label> What do you want to do?</label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
            <button className="ui button" type="submit">Create</button>
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