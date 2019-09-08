const sha256 = require('simple-sha256')

function login(username, password) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password: sha256.sync(password)
    })
  })
  .then(response => response.json())
}

const UserClient = {
  login
}

export { UserClient }