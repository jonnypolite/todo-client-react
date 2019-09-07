import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

import './ToDo.scss'
import { TaskClient } from '../../TaskClient'
import { TaskList } from '../task-list'
import { TaskForm } from '../task-form'

class ToDo extends React.Component {
  state = {
    tasks: []
  }

  async componentDidMount() {
    const tasks = await TaskClient.get()
    this.setState({ tasks })
  }

  handleCheck = async (task) => {
    const updatedTask = await TaskClient.update(task.id, {
      complete: !task.complete
    })
    const tasks = this.state.tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask
      }
      return task
    })

    this.setState({ tasks })
  }

  handleDelete = async (taskId) => {
    try {
      await TaskClient.deleteTask(taskId)
      const tasks = this.state.tasks.filter(task => task.id !== taskId)
      this.setState({ tasks })
    } catch (error) {
      console.log("Couldn't delete", error)
    }
  }

  handleNew = async (description) => {
    try {
      const newTask = await TaskClient.create(description)
      const tasks = this.state.tasks.concat([newTask])
      this.setState({ tasks })
    } catch (error) {
      console.log("Couldn't create", error)
    }
  }
  handleUpdate = async (taskId, newDescription) => {
    try {
      const updatedTask = await TaskClient.update(taskId, {
        description: newDescription
      })

      const tasks = this.state.tasks.map(task => {
        if ( task.id === updatedTask.id) {
          return updatedTask
        }
        return task
      })

      this.setState({ tasks })
    } catch (error) {
      console.log('OH NO update failed :(')
    }
  }

  render() {
    return (
      <div className="ToDo">
        <Header size="huge" icon>
          <Icon name="clipboard check" size="big" />
          To Do
        </Header>

        <TaskForm handleSubmit={this.handleNew} />

        <TaskList
          title="Incomplete Tasks"
          tasks={this.state.tasks.filter(task => !task.complete)}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate} />

        <TaskList
          title="Complete Tasks"
          tasks={this.state.tasks.filter(task => task.complete)}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate} />
      </div>
    )
  }
}

export { ToDo }