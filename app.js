const moviesDiv = document.getElementById("movies");

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
        li.textContent = `${data.name} height: ${data.height} `

        movieDiv.querySelector(".loading").style.display = "none"
        movieDiv.querySelector("ul").appendChild(li)
      })

  })
}


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
    moviesDiv.appendChild(movieDiv);


    let characters = getCharacters(movie, movieDiv)
   
  })
}




main()