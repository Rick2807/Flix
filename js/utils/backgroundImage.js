//display background 
export default function displayBackgroundImage (type, path){
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
        document.querySelector('#movie-details').appendChild(overLay)

    }else{ 
        document.querySelector('#show-details').appendChild(overLay)
    }

}