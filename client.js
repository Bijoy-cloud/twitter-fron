
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const mewElement = document.querySelector('.content')
loadingElement.style.display = 'none'
// const API_URL = window.location.hostname ==="localhost" ? "http://localhost:3000/mews" :'https://twitter-clone98.herokuapp.com/mews';
const API_URL = 'https://twitter-clone98.herokuapp.com/mews';
listAllmews()
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(event);
    const formData = new FormData(form)
    
    const name=formData.get('name')
    const content = formData.get('content')
    console.log(name)
    const mew = {
        name,
        content
    }
    
    form.style.display = 'none';
    loadingElement.style.display=""
    
    fetch(API_URL, {
        
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
          'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        form.reset()
        form.style.display=''
        loadingElement.style.display='none'
        listAllmews()
      
    })
  
});



function listAllmews(){
  mewElement.innerHTML ='';
  fetch(API_URL)
  .then(response=>response.json())
  .then(mews=>
    {
      console.log(mews)
      mews.reverse();
      mews.forEach(mew => {
        
        const div = document.createElement('div')
        const header = document.createElement('h3')
        header.textContent = mew.name
        const contents = document.createElement('p')
        contents.textContent = mew.content
        div.appendChild(header)
        div.appendChild(contents)
        mewElement.appendChild(div)
       
        
      });
    });
}
