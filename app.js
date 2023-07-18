
function getMovies() {
  return new Promise((resolve, reject) => {
    fetch("https://ajax.test-danit.com/api/swapi/films")
      .then(response => response.json()).then((data) => {
        resolve(data)
        console.log(data)
      })

  })
}

function getCharacters(movie, movieDiv) {
  movie.characters.forEach(url => {
    fetch(url)
      .then(response => response.json())
      .then((data) => {

        let li = document.createElement('li')
        li.textContent = ` Name : ${data.name} Height : ${data.height} `

        movieDiv.querySelector(".loading").style.display = "none"
        movieDiv.querySelector("ul").appendChild(li)
      })

  })
}

const moviesContainer = document.getElementById("movies");

async function main() {
  let movies = await getMovies()
  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const title = document.createElement("h2");
    title.innerText = "Episode " + movie.episodeId + " " + movie.name

    const openingCrawl = document.createElement("p");
    openingCrawl.textContent = movie.openingCrawl;

    const charactersList = document.createElement("ul");

    const loadingImg = document.createElement("img");
    loadingImg.classList.add("loading");
    loadingImg.src = "./loading.svg"
    charactersList.appendChild(loadingImg);


    movieDiv.appendChild(title);
    movieDiv.appendChild(openingCrawl);
    movieDiv.appendChild(charactersList);
    moviesContainer.appendChild(movieDiv);


    let characters = getCharacters(movie, movieDiv)
    // Promise.allSettled(characters).then(arr => {

    //   arr.forEach( (async el => {
    //     let data = await el.value.json()
    //     console.log(data)
    //     // charactersList.innerHTML += el.name
    //   }))
    // })

    //   Promise.all(movie.characters.map(characterUrl => fetch(characterUrl).then(response => response.json())))
    //     .then(charactersData => {
    //       // Remove loading icon and display characters' names
    //       charactersList.innerHTML = ""; // Remove loading icon
    //       charactersData.forEach(characterData => {
    //         const characterItem = document.createElement("li");
    //         characterItem.textContent = characterData.name;
    //         charactersList.appendChild(characterItem);
    //       });
    //     })
    //     .catch(error => {
    //       console.error("Error loading characters:", error);
    //       charactersList.innerHTML = "Error loading characters.";
    //     });
  })
}




main()