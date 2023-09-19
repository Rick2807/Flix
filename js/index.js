import Routes from './routes/routes.js'
import { search } from './component/search.js'
import { showMovieDetails } from './component/movieDetails.js'
import { showShowDetails } from './component/showDetails.js'
import { displayPopularMovies, displayPopularShows } from './component/display.js'
import {displaySliderShow, displaySlider} from './component/slider.js'
import highlightClass from './utils/highlightClass.js'




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

    // const result = page[currentPage];

    // highlightClass();
    // return result;

}


// addEventListener 
window.addEventListener('DOMContentLoaded', () => { init();});
