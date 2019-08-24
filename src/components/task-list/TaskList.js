import React from 'react';
import PropTypes from 'prop-types'
import { Header, List, Segment } from 'semantic-ui-react'

import './TaskList.scss';
import { Task } from '../task'

class TaskList extends React.Component {

  renderTasks() {
    if (this.props.tasks.length === 0) {
      return "Nothing to show!"
    }
    return (
      <List divided relaxed>
        {this.props.tasks.map((task) => {
          return (
            <List.Item key={task.id}>
              <Task
                taskData={task}
                handleCheck={this.props.handleCheck}
                handleDelete={this.props.handleDelete}
                handleUpdate={this.props.handleUpdate} />
            </List.Item>
          )
        })}
      </List>
    )
  }

  render() {
    return (
      <div className="taskList">
        <Header as="h1" textAlign="left" attached="top">
          {this.props.title}
        </Header>
        <Segment attached>
          {this.renderTasks()}
        </Segment>
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