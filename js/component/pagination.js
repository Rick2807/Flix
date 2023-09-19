import Routes from "../routes/routes.js"
import { displaySearchResults } from "./search.js"

export default function displayPagination(){
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