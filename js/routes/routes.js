import dotenv from "dotenv";
// require('dotenv').config()

console.log(dotenv)
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

export default Routes 