import displayBackgroundImage from '../utils/backgroundImage.js'
import { apiCall } from '../api/index.js';
// Show Show details 
export async function showShowDetails(){ 

    const moveid = window.location.search; //this will return this --- ?id=346698 -----
    // Convert to an array and split by equal sign (=) 
    const id = moveid.split('=')[1]  //This will return an array ['?id', '346698'] second index is the id
  
    const result = await apiCall('tv/' + id); 
    const {
        homepage,
        name,
        last_air_date,
        overview, 
        vote_average, 
        genres,
        backdrop_path,
        poster_path, 
        number_of_episodes,
        last_episode_to_air,
        status,
        production_countries
        } = result 
  
  
    displayBackgroundImage ('show', backdrop_path)
  
    const div = document.createElement('div')
    
    div.innerHTML = `
        <div class="details-top">
        <div>
        ${
            poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            class="card-img-top"
            alt="${name}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${name}"
        />`
          }
        </div>
        <div>
        <h2>${name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${Math.floor(vote_average)} / 10
        </p>
        <p class="text-muted">Last Air Date: ${last_air_date}</p>
        <p>
         ${overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
           ${genres.map(item => `<li>${item.name}<li/>`).join('')}
        </ul>
        <a href="#" target="${homepage}" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes:</span>  ${number_of_episodes} </li>
          <li><span class="text-secondary"> Last Episode To Air:</span> ${last_episode_to_air.air_date
          } </li>
          <li><span class="text-secondary">Status</span> ${status} </li>
        </ul>
        <h4>Produced in : </h4>
        <div class="list-group">${production_countries.map(item => `<span>${item.name}</span>`)}</div>
    </div>
    `
    document.querySelector('#show-details').appendChild(div)
  }