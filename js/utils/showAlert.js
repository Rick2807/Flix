// Create alert 
export default function showAlert (type, className){
    const div = document.createElement('div');
    div.classList.add('alert', className);
    // div.appendChild(document.createTextNode(type))
    div.innerHTML = type
    document.querySelector('#alert').appendChild(div)
  
    setTimeout(() => div.remove() , 2000)
  }