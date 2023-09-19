import initSwiper from "../utils/swiper.js";
import {apiCall} from '../api/index.js'

export async function displaySliderShow() {

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
export async function displaySlider(){
      
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