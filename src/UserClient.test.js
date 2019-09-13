import { UserClient } from './UserClient'
const sha256 = require('simple-sha256')

// fetch mock setup
const mockFetch = jest.fn()
const fetchReturn = { foo: 'bar' }
const mockResponseJson = jest.fn(() => fetchReturn)
mockFetch.mockResolvedValue({
  json: mockResponseJson
})
window.fetch = mockFetch

// SHA mock setup
const encPass = 'enCrypTedPassWoRd!!'
const mockSync = jest.fn(() => encPass)
sha256.sync = mockSync

afterEach(() => {
  mockFetch.mockClear()
  mockResponseJson.mockClear()
})

it('logs in', async () => {
  const response = await UserClient.login('user', 'pass')

  expect(mockFetch).toHaveBeenCalledTimes(1)
  expect(mockFetch).toHaveBeenCalledWith('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'user',
      password: encPass
    })
  })
  expect(mockSync).toHaveBeenCalledTimes(1)
  expect(mockSync).toHaveBeenCalledWith('pass')
  expect(response).toEqual(fetchReturn)
})
