import { TaskClient } from './TaskClient'
import Auth from './utils/Auth'

// fetch mock setup
const mockFetch = jest.fn()
const fetchReturn = { foo: 'bar' }
const mockResponseJson = jest.fn(() => fetchReturn)
mockFetch.mockResolvedValue({
  json: mockResponseJson
})
window.fetch = mockFetch

// Auth mock setup
const mockGetUser = jest.fn(() => ({ id: 5 }))
Auth.getUser = mockGetUser

// common values
const description = 'a task description'
const id = 42

// Helper functions
function finish(response) {
  expect(mockResponseJson).toHaveBeenCalledTimes(1)
  expect(response).toEqual(fetchReturn)
}

afterEach(() => {
  mockFetch.mockClear()
  mockResponseJson.mockClear()
})

it('exposes the right methods', () => {
  expect(Object.keys(TaskClient)).toEqual([
      'create', 'deleteTask', 'get', 'getComplete',
      'getIncomplete', 'update'
  ])
})

it('creates a task', async () => {
  const response = await TaskClient.create(description)

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith('/api/todo/5', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description })
  })
  finish(response)
})

it('deletes a task', async () => {
  const response = await TaskClient.deleteTask(id)

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      }
    })
  finish(response)
})

it('gets a specific task', async () => {
  const response = await TaskClient.get({ id })

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
  finish(response)
})

it('gets all the tasks', async () => {
  const response = await TaskClient.get()

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
  finish(response)
})

it('gets complete tasks', async () => {
  const response = await TaskClient.getComplete()

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5/?complete=true`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
  finish(response)
})

it('gets incomplete tasks', async () => {
  const response = await TaskClient.getIncomplete()

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5/?complete=false`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
  finish(response)
})

it('updates a task', async () => {
  const updateData = { a: 'b' }
  const response = await TaskClient.update(id, updateData)

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith(
    `/api/todo/5/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    finish(response)
})