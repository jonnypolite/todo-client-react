import React from 'react';
import PropTypes from 'prop-types'

import './TaskList.scss';
import { Task } from '../task'

class TaskList extends React.Component {

  renderTasks() {
    if (this.props.tasks.length === 0) {
      return "Nothing to show!"
    }
    return (
      <div className="ui relaxed divided list">
        {this.props.tasks.map((task) => {
          return (
            <div className="item" key={task.id}>
              <Task
                taskData={task}
                handleCheck={this.props.handleCheck}
                handleDelete={this.props.handleDelete}
                handleUpdate={this.props.handleUpdate} />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="taskList">
        <div className="ui segments">
          <div className="ui segment">
            <h2 className="ui header">
              {this.props.title}
            </h2>
          </div>
          <div className="ui segment">
            {this.renderTasks()}
          </div>
        </div>
      </div>
    )
  }
}

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  handleCheck: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  tasks: PropTypes.array
}

export { TaskList }