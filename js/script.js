// Init Routes
const Routes = {
    currentPage: window.location.pathname,
    search: { 
      type: '',
      term: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
    api: { 
      url: 'https://api.themoviedb.org/3/',
      key: '6ca2bb5ae3c7254754732b96203b82ef' 
    }
};

async function search(){
  const queryString = window.location.search; 
  const urlParams = new URLSearchParams(queryString); 

  Routes.search.type = urlParams.get('type'); 
  Routes.search.term = urlParams.get('search-term'); 

  if(Routes.search.term !== '' && Routes.search.term !== null){
    // do some search
    const {results, total_pages, total_results, page }= await searchApiCall(); 
    
    Routes.search.page = page
    Routes.search.totalPages = total_pages
    Routes.search.totalResults = total_results





    if(results.length === 0){ 
      showAlert('No results Found', 'error')
      return; 
      
    }
    
    
    displaySearchResults(results); 

    document.querySelector('#search-term').value = ''


  }else{
    showAlert('Please enter a search term', 'error')
  }

}

function displaySearchResults(results){
  // Clear Previous results 
  document.querySelector('#search-results').innerHTML = ''
  document.querySelector('#search-results-heading').innerHTML = ''
  document.querySelector('#pagination').innerHTML = ''

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="${Routes.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${Routes.search.type === 'movie' ? result.title : result.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${Routes.search.type === 'movie' ? result.title : result.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${Routes.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${Routes.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
        `;
    
        document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${Routes.search.totalResults} Results for ${Routes.search.term}</h2> 
        `      
      document.querySelector('#search-results').appendChild(div);
  });

  displayPagination()
}

function displayPagination(){
  const div = document.createElement('div')
  div.classList.add('pagination')
  div.innerHTML = `
 
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${Routes.search.page} of ${Routes.search.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div)

  // disable prev button if its the first page 
  if(Routes.search.page === 1){
  document.querySelector('#prev').disabled = true

  }

  if(Routes.search.page === Routes.search.totalPages){
  document.querySelector('#next').disabled = true
    
  }

  document.querySelector('#next').addEventListener('click', async () => { 
    Routes.search.page++
    const {results, total_pages} = await searchApiCall(); 
    displaySearchResults(results)
  })

  document.querySelector('#prev').addEventListener('click', async () => { 
    Routes.search.page--
    const {results, total_pages} = await searchApiCall(); 
    displaySearchResults(results)
  })
}

// Show Show details 
async function showShowDetails(){ 

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

// Show movie details 
async function showMovieDetails(){ 

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
            <li>${genres[0].name}</li>
            <li>${genres[1].name}</li>
            <li>${genres[2].name}</li>
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


//display background 
function displayBackgroundImage (type, path){
    const overLay = document.createElement('div')
    overLay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;
    overLay.style.backgroundSize = 'cover'
    overLay.style.backgroundPosition = 'center'
    overLay.style.backgroundRepeat = 'no-repeat'
    overLay.style.height = '100vh'
    overLay.style.width = '100vw'
    overLay.style.position = 'absolute'
    overLay.style.top = '0'
    overLay.style.left = '0'
    overLay.style.zIndex = '-1'
    overLay.style.opacity = '0.25'

    if (type === 'movie'){ 
        document.querySelector('#movie-details').append(overLay)

    }else{ 
        document.querySelector('#show-details').append(overLay)
    }

}

// Create alert 
function showAlert (type, className){
  const div = document.createElement('div');
  div.classList.add('alert', className);
  // div.appendChild(document.createTextNode(type))
  div.innerHTML = type
  document.querySelector('#alert').appendChild(div)

  setTimeout(() => div.remove() , 2000)
}

function numberFormat (number){
    if(number) return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    return 0; 
}


// Display 20 most popular movies
async function displayPopularMovies(){

    
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
async function displayPopularShows(){
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


// Hide spinner
function showSpinner (){ 
    document.querySelector('.spinner').classList.add('show')
}
// Show spinner
function hideSpinner (){ 
    document.querySelector('.spinner').classList.remove('show')
}
    
async function displaySliderShow() {

  const { results } = await apiCall('tv/airing_today');
  
  
  results.forEach(movie => {
  
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
  
    div.innerHTML = ` 
      
          <a href="tv-details.html?id=${movie.id}">
            <img src=https://www.themoviedb.org/t/p/w500${movie.poster_path} alt=${movie.title} />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
          </h4>
  
          <div class="swiper-pagination"></div>
         `;
  
    document.querySelector('.swiper-wrapper').appendChild(div);
  
  });
  
  initSwiper();
  }


// slider call
async function displaySlider(){
    
  const {results} = await apiCall('movie/now_playing'); 
 
  results.forEach(movie => {
  
    const div = document.createElement('div');
    div.classList.add('swiper-slide')

    div.innerHTML = ` 
      
          <a href="movie-details.html?id=${movie.id}">
            <img src=https://www.themoviedb.org/t/p/w500${movie.poster_path} alt=${movie.title} />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
          </h4>

          <div class="swiper-pagination"></div>
         `
        
          document.querySelector('.swiper-wrapper').appendChild(div)
        
  })

  initSwiper()
}

// init Swiper 
function initSwiper() {
  let swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}



//API call 
async function apiCall (endpoint){ 
    const API = Routes.api.key
    const URL = Routes.api.url

    showSpinner()
   
    const API_URL = `${URL}${endpoint}?api_key=${API}&language=en-US`
    
    const response = await fetch(API_URL); 
    const data = await response.json()
    
    hideSpinner()

    return data
}

//SearchAPI call 
async function searchApiCall (endpoint){ 
  const API = Routes.api.key
  const URL = Routes.api.url

  showSpinner()
 
  const API_URL = `${URL}search/${Routes.search.type}?api_key=${API}&language=en-US&query=${Routes.search.term}&page=${Routes.search.page}`
  
  const response = await fetch(API_URL); 
  const data = await response.json()
  
  hideSpinner()

  return data
}

// Hightlight menu 
function highlightClass() {
    const links = document.querySelectorAll('.header__link');
    
    // Add active to href value that matches currentpage.
    links.forEach(link => {
        if(link.getAttribute('href') === Routes.currentPage){
            link.classList.add('active')
        }
    })
}

// init function 
function init() {
    switch (Routes.currentPage) {
        case '/':
        case '/index.html':
          displaySlider();
          displayPopularMovies();
          break;
        case '/shows.html':
          displaySliderShow();
          displayPopularShows();
          break;
        case '/movie-details.html':
           showMovieDetails()
          break;
        case '/tv-details.html':
           showShowDetails();
          break;
        case '/search.html':
          search();
          break;
      }
    
      highlightClass();
    
    // const { currentPage } = Routes;
    // const page = {
    //     '/': () => displayPopularMovies(),
    //     '/shows.html': () => displayPopularShows(),
    //     '/movie-details.html': showMovieDetails(),
    //     '/tv-details.html': currentPage,
    //     '/search.html': currentPage
    // };

    // const result = page[currentPage]();

    // highlightClass();
    // return result;

}


// addEventListener 
window.addEventListener('DOMContentLoaded', () => { init();});
