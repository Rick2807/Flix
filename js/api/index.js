import Routes from "../routes/routes.js"
import { showSpinner, hideSpinner } from "../utils/spinner.js"

//API call 
export async function apiCall (endpoint){ 
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
export async function searchApiCall (){ 
  const API = Routes.api.key
  const URL = Routes.api.url

  showSpinner()
 
  const API_URL = `${URL}search/${Routes.search.type}?api_key=${API}&language=en-US&query=${Routes.search.term}&page=${Routes.search.page}`
  
  const response = await fetch(API_URL); 
  const data = await response.json()
  
  hideSpinner()

  return data
}