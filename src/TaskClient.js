function deleteTask(id) {
  return fetch(`/api/todo/${id}`, {
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
    return fetch(`/api/todo/${id}`, { accept: 'application/json' })
      .then(parseJSON)
  }

  // get all of them
  return fetch(`/api/todo/`, { accept: 'application/json' })
    .then(parseJSON)
}

function getComplete() {
  return fetch(`/api/todo/?complete=true`, { accept: 'application/json' })
    .then(parseJSON)
}

function getIncomplete() {
  return fetch(`/api/todo/?complete=false`, { accept: 'application/json' })
    .then(parseJSON)
}

function update(id, updateData) {
  return fetch(`/api/todo/${id}`, {
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
  deleteTask,
  get,
  getComplete,
  getIncomplete,
  update
}

export { TaskClient }