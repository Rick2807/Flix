import { apiCall } from "../api/index.js";
// Display 20 most popular movies
export async function displayPopularMovies(){

    
    const {results} = await apiCall('movie/popular')
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
              <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                    : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
              </div>
            `;
        
        document.querySelector('#popular-movies').appendChild(div);
      });
}

// Display 20 most popular shows 
export async function displayPopularShows(){
    const {results} = await apiCall('tv/popular')

    // Loop through results and create a div for each element
    results.forEach(item => { 

        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${item.id}">
            ${
                item.poster_path 
                ? 
                `<img src="	https://www.themoviedb.org/t/p/w500${item.poster_path}" alt=${item.name} class="card-img-top">`
                :
                `<img src="../images/no-image.jpg" alt=${item.name} class="card-img-top"></img>`
            }
            </a>

            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Air Date: ${item.first_air_date}</small> 
                </p>
            </div>
        `    
        // console.log(document.querySelector('#popular-shows'))
        document.querySelector('#popular-shows').appendChild(div)     
    })
}
