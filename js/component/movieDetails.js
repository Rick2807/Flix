import displayBackgroundImage from '../utils/backgroundImage.js'
import { apiCall } from '../api/index.js';
import numberFormat from '../utils/numberFormat.js'
// Show movie details 
export async function showMovieDetails(){ 

    const moveid = window.location.search; //this will return this --- ?id=346698 -----
    // Convert to an array and split by equal sign (=) 
    const id = moveid.split('=')[1]  //This will return an array ['?id', '346698'] second index is the id

    const result = await apiCall('movie/' + id)
    const {
        homepage,
        title,
        release_date,
        overview, 
        vote_average, 
        genres,
        backdrop_path,
        poster_path, 
        budget, 
        revenue, 
        runtime, 
        status,
        production_companies
        } = result 

    

    if(id){
        document.querySelector('.now-playing').style.display = 'none'

    }
    
    displayBackgroundImage ('movie', backdrop_path)
    


    const div = document.createElement('div')
    
    div.innerHTML = `
        <div class="details-top">
        <div>
        ${
            poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            class="card-img-top"
            alt="${title}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${title}"
        />`
          }
        </div>
        <div>
        <h2>${title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${Math.floor(vote_average)} / 10
        </p>
        <p class="text-muted">Release Date: ${release_date}</p>
        <p>
         ${overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
           ${genres.map(item => { `<li>${item.name}</li>`}).join('')}
        </ul>
        <a href="#" target="${homepage}" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> $ ${numberFormat(budget)} </li>
        <li><span class="text-secondary">Revenue:</span> $ ${numberFormat(revenue)} </li>
        <li><span class="text-secondary">Runtime:</span> $ ${numberFormat(runtime)}  </li>
        <li><span class="text-secondary">Status:</span> $ ${numberFormat(status)} </li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${production_companies.map(item => `<span>${item.name}</span>`).join(', ')}</div>
    </div>
    `
    document.querySelector('#movie-details').appendChild(div)
}
