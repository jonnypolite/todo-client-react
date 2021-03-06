import React from 'react'
import PropTypes from 'prop-types'

import './Task.scss';

class Task extends React.Component {
  state = {
    description: this.props.taskData.description,
    editing: false
  }

  onCheckClick = () => {
    this.props.handleCheck(this.props.taskData)
  }

  onDeleteClick = () => {
    this.props.handleDelete(this.props.taskData.id)
  }

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  onEditClick = () => {
    this.setState({ editing: true })
  }

  onCancelClick = () => {
    this.setState({ editing: false })
  }

  onFormSubmit = () => {
    this.props.handleUpdate(this.props.taskData.id, this.state.description)
    this.setState({ editing: false })
  }

  renderDisplayTask = () => {
    return (
      <div className="task">
        <div className="ui checkbox">
          <input
            onClick={this.onCheckClick}
            type="checkbox"
            defaultChecked={this.props.taskData.complete}
            tabIndex={this.props.taskData.id} />
          <label className="noSelection">
            {this.props.taskData.description}
          </label>
        </div>
        <div
          className="deleteIcon floatRight"
          data-tooltip="delete">
          <i onClick={this.onDeleteClick} className="trash icon"></i>
        </div>
        <div
          className="editIcon floatRight"
          data-tooltip="edit">
          <i onClick={this.onEditClick} className="edit icon"></i>
        </div>
      </div>
    )
  }

  renderEditTask = () => {
    return (
      <div className="task">
        <form
          onSubmit={this.onFormSubmit}
          className="ui form">
          <div className="field">
            <input
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange} />
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="ui icon button"
              data-tooltip="save">
              <i className="check circle icon"></i>
            </button>
            <button
              className="ui icon button"
              data-tooltip="cancel"
              onClick={this.onCancelClick} >
              <i className="cancel icon"></i>
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEditTask() : this.renderDisplayTask()
  }
}

Task.propTypes = {
  taskData: PropTypes.object.isRequired,
  handleCheck: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func
}

Task.defaultProps = {
  handleCheck: () => { },
  handleDelete: () => { },
  handleUpdate: () => { }
}

export { Task }