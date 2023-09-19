import Routes from "../routes/routes.js";
import { searchApiCall } from "../api/index.js";
import showAlert from "../utils/showAlert.js";
import displayPagination from "./pagination.js";



export async function search(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString); 
  
    Routes.search.type = urlParams.get('type'); 
    Routes.search.term = urlParams.get('search-term'); 
  
    if(Routes.search.term !== '' && Routes.search.term !== null){
      // do some search
      const {results, total_pages, total_results, page } = await searchApiCall(); 
      
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
      return
    }
  
  }
  
export function displaySearchResults(results){
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