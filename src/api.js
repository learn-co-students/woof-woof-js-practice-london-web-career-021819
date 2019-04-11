const DOGS_URL = "http://localhost:3000/pups";

//  get dogs
function getDogs() {
  return fetch(DOGS_URL).then(resp => resp.json());
}

// toggle dog status - PATCH
function updateDog(dog) {
  return fetch(`${DOGS_URL}/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  }).then(resp => resp.json());
}
