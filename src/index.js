
const dogContainer = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')

function addPupsToPage(pup) {
  let cardEl = document.createElement('span')
  cardEl.className = 'dogg'
  cardEl.innerHTML =
                      `
                      ${pup.name}
                      `
      dogContainer.appendChild(cardEl)

    cardEl.addEventListener('click', () => {
      dogInfo.innerHTML = `
      <img src=${pup.image} >
      <h2> ${pup.name} </h2>
      <button id="filter-btn"> ${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
                          `

      const filterBtn = document.querySelector('#filter-btn')
      filterBtn.addEventListener('click', () => {
        pup.isGoodDog = !pup.isGoodDog
        updatedog(pup)
        filterBtn.innerText = `${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
      })
   })
}

function addPups(pups) {
  pups.forEach(addPupsToPage)
}

  getPups()
  .then(addPups)
