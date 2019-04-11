const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");

// render one dog name
function renderDogName(dog) {
  // create dog name span
  const nameSpan = document.createElement("span");
  nameSpan.id = dog.id;
  // populate the span
  nameSpan.innerText = `${dog.name}`;
  // append dog name span to dogBar
  dogBar.appendChild(nameSpan);
  //when the name is clicked, show the dog details:
  nameSpan.addEventListener("click", () => renderDogDetails(dog));
}

// render dog details in the dog-info div
function renderDogDetails(dog) {
  dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button class="good-or-bad"></button>
    `;
  // set inital depending on status:
  dogbutt = dogInfo.querySelector("button");
  if (dog.isGoodDog == true) {
    dogbutt.innerText = "Good Dog!";
  } else {
    dogbutt.innerText = "Bad Dog!";
  }

  toggleDogBtn(dog);
}

// toggle good/bad dog button text
function toggleDogBtn(dog) {
  goodOrBadBtn = dogInfo.querySelector(".good-or-bad");
  goodOrBadBtn.addEventListener("click", () => {
    if (goodOrBadBtn.innerText == "Good Dog!") {
      goodOrBadBtn.innerText = "Bad Dog!";
      dog.isGoodDog = false;
    } else {
      goodOrBadBtn.innerText = "Good Dog!";
      dog.isGoodDog = true;
    }
    updateDog(dog);
  });
}

function allDogs(dogs) {
  dogs.forEach(renderDogName);
}

function init() {
  getDogs().then(allDogs);
}

init();
