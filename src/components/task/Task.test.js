import React from 'react'
import { shallow } from 'enzyme'
import { Task } from './Task'

const deleteHandler = jest.fn()
const checkHandler = jest.fn()
const updateHandler = jest.fn()
const taskProps = {
  taskData: {
    id: 1,
    description: 'task description'
  },
  handleCheck: checkHandler,
  handleDelete: deleteHandler,
  handleUpdate: updateHandler
}
const task = shallow(<Task { ...taskProps } />)

function clickCancel(taskNode) {
  taskNode
    .find('button[data-tooltip="cancel"].ui.icon.button')
    .simulate('click')
}

function clickCheck(taskNode) {
  taskNode
    .find('input[type="checkbox"]')
    .simulate('click')
}

function clickDelete(taskNode) {
  taskNode.find('i.trash.icon').simulate('click')
}

function clickEdit(taskNode) {
  taskNode.find('i.edit.icon').simulate('click')
}

function verifyDisplayRender() {
  const checkBoxDiv = task.find('div.ui.checkbox')
  const checkBox = checkBoxDiv.find('input[type="checkbox"]')
  const deleteDiv = task.find('div[data-tooltip="delete"].deleteIcon.floatRight')
  const deleteIcon = deleteDiv.find('i.trash.icon')
  const editDiv = task.find('div[data-tooltip="edit"].editIcon.floatRight')
  const editIcon = editDiv.find('i.edit.icon')

  expect(checkBoxDiv).toHaveLength(1)
  expect(checkBoxDiv.contains(
    <label className="noSelection">{taskProps.taskData.description}</label>
  )).toEqual(true)
  expect(checkBox).toHaveLength(1)

  expect(deleteDiv).toHaveLength(1)
  expect(deleteIcon).toHaveLength(1)

  expect(editDiv).toHaveLength(1)
  expect(editIcon).toHaveLength(1)
}

afterEach(() => {
  deleteHandler.mockClear()
})

it('correctly renders a display task', () => {
  verifyDisplayRender()
});

it('correctly renders an edit task', () => {
  clickEdit(task)

  const form = task.find('form.ui.form')
  const inputDiv = form.find('div.field')
  const input = inputDiv.find('input[type="text"]')
  const buttonsDiv = form.find('div.buttons')
  const saveButton = buttonsDiv.find('button[data-tooltip="save"].ui.icon.button')
  const cancelButton = buttonsDiv.find('button[data-tooltip="cancel"].ui.icon.button')

  expect(form).toHaveLength(1)
  expect(inputDiv).toHaveLength(1)
  expect(input).toHaveLength(1)
  expect(input.prop('value')).toEqual(taskProps.taskData.description)
  expect(buttonsDiv).toHaveLength(1)
  expect(saveButton).toHaveLength(1)
  expect(saveButton.contains(
    <i className="check circle icon"></i>
  ))
  expect(cancelButton).toHaveLength(1)
  expect(cancelButton.contains(
    <i className="cancen icon"></i>
  ))

  clickCancel(task)
})

it('handles delete', () => {
  clickDelete(task)

  expect(deleteHandler).toHaveBeenCalledTimes(1)
  expect(deleteHandler).toHaveBeenCalledWith(taskProps.taskData.id)
})

it('handles check', () => {
  clickCheck(task)

  expect(checkHandler).toHaveBeenCalledTimes(1)
  expect(checkHandler).toHaveBeenCalledWith(taskProps.taskData)
})

it('handles description change', () => {
  const value = 'edited task description'
  clickEdit(task)
  const descField = task.find('input[type="text"]')
  descField.simulate('change', {
    target: { value }
  })

  expect(task.state().description).toEqual(value)

  clickCancel(task)
})

it('handles cancel', () => {
  clickEdit(task)
  clickCancel(task)

  verifyDisplayRender()
})

it('handles form submit', () => {
  clickEdit(task)
  task.find('form')
    .simulate('submit')

  expect(updateHandler).toHaveBeenCalledTimes(1)
  expect(updateHandler).toHaveBeenCalledWith(
    taskProps.taskData.id,
    'edited task description'
  )
})