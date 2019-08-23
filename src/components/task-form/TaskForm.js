import React from 'react';
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import './TaskForm.css';

class TaskForm extends React.Component {
  state = {
    description: ''
  }

  onCancelClick = () => {
    this.setState({ editing: false })
  }

  onFormSubmit = () => {
    this.props.handleUpdate(this.props.taskData.id, this.state.description)
    this.setState({ editing: false })
  }

  render() {
    return (
      <div className="taskForm">
        <div className="ui top attached segment">
          put a form here
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