import React from 'react'
import { shallow } from 'enzyme'
import { TaskForm } from './TaskForm'

const submitHandler = jest.fn()
const taskFormProps = {
  handleSubmit: submitHandler
}

const taskForm = shallow(<TaskForm { ...taskFormProps } />)

it('correctly renders', () => {
  const segmentDiv = taskForm.find('div.ui.attached.segment')
  const form = segmentDiv.find('form.ui.form')
  const fieldDiv = form.find('div.field')
  const submitDiv = form.find('div.submitButton')

  expect(segmentDiv).toHaveLength(1)
  expect(form).toHaveLength(1)
  expect(form.childAt(0)).toEqual(fieldDiv)
  expect(fieldDiv.contains(
    <label>What do you want to do?</label>
  ))
  expect(fieldDiv.contains(
    <input type="text" />
  ))
  expect(form.childAt(1)).toEqual(submitDiv)
  expect(submitDiv.contains(
    <button className="ui button" type="submit">Create</button>
  ))
})

it('handles change', () => {
  const value = 'some text'
  const input = taskForm.find('input[type="text"]')

  input.simulate('change', {
    target: { value }
  })

  expect(taskForm.state().description).toEqual(value)
})

it('handles form submit', () => {
  taskForm.find('form.ui.form')
    .simulate('submit', {
      preventDefault: () => { }
    })

  expect(submitHandler).toHaveBeenCalledTimes(1)
  expect(submitHandler).toHaveBeenCalledWith(
    'some text'
  )
  expect(taskForm.state().description).toEqual('')
})