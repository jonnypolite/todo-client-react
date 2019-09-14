import Auth from './utils/Auth'

function create(description) {
  return fetch(`/api/todo/${Auth.getUser().id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description })
  })
  .then(parseJSON)
}

function deleteTask(id) {
  return fetch(`/api/todo/${Auth.getUser().id}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(parseJSON)
}

function get({ id, queryParams = {} } = {}) {
  let path = `/api/todo/${Auth.getUser().id}`

  if (id) {
    path = `${path}/${id}`
  }

  const paramKeys = Object.keys(queryParams);
  if (paramKeys.length) {
    const params = paramKeys.map((key) => {
      return `${key}=${queryParams[key]}`
    }).join('&')

    path = `${path}/?${params}`
  }

  return fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(parseJSON)
}

function getComplete() {
  return get({ queryParams: { complete: true }})
}

function getIncomplete() {
  return get({ queryParams: { complete: false }})
}

function update(id, updateData) {
  return fetch(`/api/todo/${Auth.getUser().id}/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
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