import Routes from "../routes/routes.js";
// Hightlight menu 
export default function highlightClass() {
    const links = document.querySelectorAll('.header__link');
    
    // Add active to href value that matches currentpage.
    links.forEach(link => {
        if(link.getAttribute('href') === Routes.currentPage){
            link.classList.add('active')
        }
    })
}