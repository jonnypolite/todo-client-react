import Auth from './Auth'
import { UserClient } from '../UserClient'

// sessionStorage mock setup
const mockClear = jest.fn()
const mockSetItem = jest.fn()
const mockGetItem = jest.fn()
mockGetItem.mockReturnValue(
  JSON.stringify({ id: 42 })
)
Storage.prototype.getItem = mockGetItem
Storage.prototype.setItem = mockSetItem
Storage.prototype.clear = mockClear

// UserClient mock setup
const mockUserClientLogin = jest.fn(() => ({
  success: true,
  id: 42
}))
UserClient.login = mockUserClientLogin

afterEach(() => {
  mockGetItem.mockClear()
  mockSetItem.mockClear()
  mockUserClientLogin.mockClear()
  mockClear.mockClear()
})

it('exposes the right methods', () => {
  expect(Object.keys(Auth)).toEqual([
      'getUser', 'isAuthenticated', 'login', 'logout'
  ])
})

it('gets user info from session storage', () => {
  const user = Auth.getUser()

  expect(mockGetItem).toHaveBeenCalledTimes(1)
  expect(mockGetItem).toHaveBeenCalledWith('user')
  expect(user).toEqual({ id: 42 })
})

it('can tell if someone is authed', () => {
  const authed = Auth.isAuthenticated()

  expect(mockGetItem).toHaveBeenCalledTimes(1)
  expect(mockGetItem).toHaveBeenCalledWith('user')
  expect(authed).toEqual(true)
})

it('can tell if someone is not authed', () => {
  mockGetItem.mockReturnValue(null)
  const authed = Auth.isAuthenticated()

  expect(mockGetItem).toHaveBeenCalledTimes(1)
  expect(mockGetItem).toHaveBeenCalledWith('user')
  expect(authed).toEqual(false)
})

it('logs someone in', async () => {
  const username = 'user'
  const password = 'pass'
  const response = await Auth.login(username, password)

  expect(mockUserClientLogin).toHaveBeenCalledTimes(1)
  expect(mockUserClientLogin).toHaveBeenCalledWith(
    username,
    password
  )
  expect(mockSetItem).toHaveBeenCalledTimes(1)
  expect(mockSetItem).toHaveBeenCalledWith(
    'user',
    JSON.stringify({ id: 42 })
  )
  expect(response).toEqual({
    success: true,
    id: 42
  })
})

it('does not log someone in', async () => {
  mockUserClientLogin.mockResolvedValue({
    success: false
  })
  const username = 'user'
  const password = 'pass'
  const response = await Auth.login(username, password)

  expect(mockUserClientLogin).toHaveBeenCalledTimes(1)
  expect(mockUserClientLogin).toHaveBeenCalledWith(
    username,
    password
  )
  expect(mockSetItem).toHaveBeenCalledTimes(0)
  expect(response).toEqual({
    success: false
  })
})

it('logs someone out', () => {
  Auth.logout()

  expect(mockClear).toHaveBeenCalledTimes(1)
})