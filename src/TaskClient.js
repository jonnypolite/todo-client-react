import Auth from './utils/Auth'

function create(description) {
  return fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description, user: Auth.getUser().id })
  })
  .then(parseJSON)
}

function deleteTask(id) {
  return fetch(`/api/todo/${id}/?user=${Auth.getUser().id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(parseJSON)
}

function get(id) {
  // get a specific task
  if (id) {
    return fetch(`/api/todo/${id}/?user=${Auth.getUser().id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(parseJSON)
  }

  // get all of them
  return fetch(`/api/todo/?user=${Auth.getUser().id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(parseJSON)
}

function getComplete() {
  return fetch(`/api/todo/?complete=true&user=${Auth.getUser().id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(parseJSON)
}

function getIncomplete() {
  return fetch(`/api/todo/?complete=false&user=${Auth.getUser().id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(parseJSON)
}

function update(id, updateData) {
  return fetch(`/api/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign(updateData, { user: Auth.getUser().id }))
  })
  .then(parseJSON)
}

// HELPER FUNCTIONS
function parseJSON(response) {
  return response.json()
}

const TaskClient = {
  create,
  deleteTask,
  get,
  getComplete,
  getIncomplete,
  update
}

export { TaskClient }