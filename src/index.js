const pupsUrl = 'http://localhost:3000/pups'
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')
const dogFilterEl = document.querySelector('#good-dog-filter')
let filtered = false
let dogs


// SERVER SIDE

function getDogs () {
  return fetch(pupsUrl)
    .then(res => res.json())
    .then(json => dogs = json)
}

function patchDog (dog) {
  let config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dog)
  }

  return fetch(pupsUrl + `/${dog.id}`, config)
}

// CLIENT SIDE

// Build dog bar
function addDog (dog) {
  const spanEl = document.createElement('span')
  spanEl.innerText = dog.name
  spanEl.id = `dog-${dog.id}`
  dogBarEl.append(spanEl)

  spanEl.addEventListener('click', function(e) {
    displayDog(dog)
  })
}

function addDogs (dogs) {
  dogs.forEach(addDog)
}

// Display dog
function displayDog (dog) {
  dogInfoEl.innerHTML = `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  `
  dogBtnEl = document.createElement('button')
  dogBtnEl.innerText = dog.isGoodDog ? 'Bad Dog!' : 'Good Dog!'
  dogInfoEl.append(dogBtnEl)

  dogBtnEl.addEventListener('click', function(e) {
    toggleGoodBad(dog)
    patchDog(dog)
      .then(() => toggleButtonText(dogBtnEl))
      .then(() => {
        if (filtered == true) {
          const dogSpanEl = dogBarEl.querySelector(`#dog-${dog.id}`)
          dogSpanEl.remove()
          dogInfoEl.innerHTML = ''
        }
      })
  })

}

// Good/bad dog
function toggleGoodBad (dog) {
  const toggle = {true: false, false: true}
  dog.isGoodDog = toggle[dog.isGoodDog]
}

function toggleButtonText (btn) {
  const toggle = {'Good Dog!': 'Bad Dog!','Bad Dog!': 'Good Dog!'}
  btn.innerText = toggle[btn.innerText]
}

// Filter
dogFilterEl.addEventListener('click', function(e) {
  dogBarEl.innerHTML = ''
  if (filtered) {
    addDogs(dogs)
    dogFilterEl.innerText = 'Filter good dogs: OFF'
    filtered = false
  } else {
    addDogs(filterDogs())
    dogFilterEl.innerText = 'Filter good dogs: ON'
    filtered = true
  }
});

function filterDogs () {
  return dogs.filter(dog => dog.isGoodDog == true)
}

// Init

function init () {
  getDogs()
    .then(addDogs)
}

init()
