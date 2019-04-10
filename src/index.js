document.addEventListener("DOMContentLoaded", () => {
  renderDogs()
});



const dog_url = ('http://localhost:3000/pups')
const dogBars = document.querySelector('#dog-bar')
const dogSum = document.querySelector('#dog-summary-container')
const dogInfo = document.querySelector('#dog-info')

function getDogs() {
  return fetch(dog_url)
  .then(response => response.json())
}

function addDog(dog) {
  spanEL = document.createElement('span')
  spanEL.innerText = `${dog.name}`
  document.querySelector('#dog-bar').appendChild(spanEL)

  spanEL.addEventListener('click', (event) => {
    document.querySelector('#dog-info').innerHTML =
    `
    <img src='${dog.image}'>
    <h2>${dog.name}</h2>
    <button Id="goodBad">${dog.isGoodDog ? 'Good dog!' : 'Bad Dog!'}</button>
    `
    const btn = document.querySelector('#goodBad')
    btn.addEventListener('click', (event) => {
      dog.isGoodDog = !dog.isGoodDog;
      btn.innerText = `${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
      updateDog(dog)
    })


  })
}

function renderDogs() {
  getDogs()
  .then(dogs => dogs.forEach(addDog))
}

function updateDog(dog) {
  return fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-type' : 'application/json'},
    body: JSON.stringify(dog)
  }).then(response => response.json())
}
