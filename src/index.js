const pupsURL = "http://localhost:3000/pups"


/// FETCH DOGS
function fetchPups() {
  return fetch(pupsURL)
  .then(response => response.json())
}

/// RENDER PAGE
function renderPage() {
  fetchPups()
  .then(pups => pups.
  forEach(pup => createPupBar(pup)))
}

/// CREATE PUP BAR
function createPupBar(pup){
  let divEl = document.getElementById('dog-bar')

  let spanEl = document.createElement('span')
  spanEl.innerText = pup.name
  spanEl.style = 'text-align: center'
  spanEl.addEventListener('click', () => {
    createPupPage(pup)
  })
  divEl.appendChild(spanEl)

  let filterEl = document.getElementById('good-dog-filter')
  filterEl.addEventListener('click', () => {
    // toggle pups
  })
}

/// CREATE PUP PAGE
function createPupPage(pup) {
  let pageEl = document.getElementById('dog-info')
  pageEl.innerHTML = ""

  let imgEl = document.createElement('img')
  imgEl.src = pup.image
  imgEl.style = 'height: 200px'
  imgEl.align = 'center'
  pageEl.appendChild(imgEl)

  let nameEl = document.createElement('h2')
  nameEl.innerText = pup.name
  pageEl.appendChild(nameEl)

  let buttonEl = document.createElement('button')
  buttonEl.id = 'change-boolean'
  buttonEl.innerText = `${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
  buttonEl.addEventListener('click', () => {
    pup.isGoodDog = !pup.isGoodDog
    updateGoodBad(pup)
    buttonEl.innerText = `${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
  })
  pageEl.appendChild(buttonEl)
}

/// UPDATE GOOD / BAD PUP
function updateGoodBad(pup) {
  return fetch(`${pupsURL}` + `/${pup.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(pup)
  }).then(response => response.json())
}

/// INITIALIZE
document.addEventListener("DOMContentLoaded", function () {
  renderPage()
});
