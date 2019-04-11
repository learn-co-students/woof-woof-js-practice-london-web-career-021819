const dogDiv = document.querySelector("#dog-info");
const dogBar = document.querySelector("#dog-bar");
const dogsUrl = "http://localhost:3000/pups";
let allDogs = []

const dogFilterBtn = document.querySelector("#good-dog-filter")

//API
function getAllDogs() {
  return fetch(dogsUrl).then(resp => resp.json());
}

function updateDog(dog) {
  return fetch(`${dogsUrl}/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  }).then(resp => resp.json());
}

//DOM

function renderDogBar(dogs) {
    dogBar.innerHTML = ""
  dogs.forEach(dog => {
    const dogSpan = document.createElement("span");
    dogSpan.innerText = dog.name;
    dogBar.appendChild(dogSpan);
    dogSpan.addEventListener("click", function() {
      dogDiv.innerHTML = `
        <img src= "${dog.image}">
        <h2>${dog.name}</h2>
        <button class="dog-btn"></button>
          `;
      const dogBtn = document.querySelector(".dog-btn");
      if (dog.isGoodDog === false) {
        dogBtn.innerText = "Bad Dog";
      } else {
        dogBtn.innerText = "Good Dog";
      }
      toggleGoodBad(dog);
    });
  });
}
function toggleGoodBad(dog) {
  const dogBtn = document.querySelector(".dog-btn");
  dogBtn.addEventListener("click", () => {
    if (dogBtn.innerText === "Good Dog") {
      dogBtn.innerText = "Bad Dog";
      dog.isGoodDog = false;
    } else {
      dogBtn.innerText = "Good Dog";
      dog.isGoodDog = true;
    }
  });
  updateDog(dog);
}

dogFilterBtn.addEventListener('click', () => {
    const filteredDogs = allDogs.filter( dog => {
        return dog.isGoodDog === true
    })
    renderDogBar(filteredDogs)
})

//init
function init() {
  getAllDogs().then(data => {
      allDogs = data
      renderDogBar(allDogs)
    });
}

init();
