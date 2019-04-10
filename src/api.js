
function getPups() {
  return fetch('http://localhost:3000/pups/')
  .then(response => response.json())
}

function updatedog(pup) {
  return fetch('http://localhost:3000/pups/' + `/${pup.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(pup)
  }).then(response => response.json())
}
