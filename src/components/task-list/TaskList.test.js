import React from 'react'
import { shallow } from 'enzyme'
import { TaskList } from './TaskList'

const task1 = {
  id: 1,
  description: 'task 1 desc',
  complete: false,
  user: 1
}
const task2 = {
  id: 2,
  description: 'task 2 desc',
  complete: false,
  user: 1
}
const props = {
  title: 'a title',
  tasks: [task1, task2]
}
const taskList = shallow(<TaskList { ...props } />)

it('correctly renders', () => {
  // This one is a loose render check.
  // I really just want to see that there is a title
  // somewhere and two tasks
  const title = taskList.find('h2.ui.header')
  const tasks = taskList.find('Task')

  expect(title).toHaveLength(1)
  expect(title.text()).toEqual(props.title)
  expect(tasks).toHaveLength(2)
})