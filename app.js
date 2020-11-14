// const auth =     "563492ad6f91700001000001b5010721db7149b09b8c21644290c045"; 
// const gallery = document.querySelector(".gallery");

// ;

class pexelApi {
  constructor(){
    this.config = {
      headers: {
        Authorization: '563492ad6f91700001000001b5010721db7149b09b8c21644290c045'
      }
    }
  }

async getCuratedPhotos(page){
const photoResponse = await fetch(`https://api.pexels.com/v1/curated/?page=${page}&per_page=15`,this.config);

const data = await photoResponse.json();

return data;

}

async getSearchPhotoApi(input,page){

  const searchResponse = await fetch(`https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=${input}`,this.config);

  const dataSearch = await searchResponse.json();

  return dataSearch;

}


}

class UI{
constructor(){
this.gallery = document.querySelector(".gallery");

}

populatePhoto(data){
  data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} class="download">Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    this.gallery.appendChild(galleryImg);
  });
}

populateSearchPhoto(data){
 
  data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} class="download">Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    this.gallery.appendChild(galleryImg);
  });




}

clearInput(input){
  const inputed = input
  inputed.value = "";
this.gallery.innerHTML = "";

}



}
const pexel = new pexelApi();
const ui = new UI();

let page = 1;
let inputStore;
document.addEventListener("DOMContentLoaded", fetchCuratedPhoto);


function fetchCuratedPhoto(){

  pexel.getCuratedPhotos(page)
  .then(data => {
    
    ui.populatePhoto(data)

  })
  .catch(err =>{
    console.log(err)
  })

}


const form = document.querySelector(".search-form");

form.addEventListener("submit", getSearchPhoto)

function getSearchPhoto(e){
  const searchInput = document.querySelector(".search-input");

  const searchValue = searchInput.value;
  
  inputStore = searchValue;
  

  if(searchValue !== ""){
    pexel.getSearchPhotoApi(searchValue,page)
    .then(data => {
     
      ui.clearInput(searchInput)
      ui.populateSearchPhoto(data)
  
    })
    .catch(err =>{
      console.log(err)
    })
    


  }else{
    window.alert("you must enter something, ODE")

  }

e.preventDefault()
}

const more = document.querySelector(".more")
more.addEventListener("click", morePhotos)

function morePhotos(e){

page++ 

if(inputStore){

pexel.getSearchPhotoApi(inputStore,page)
    .then(data => {
      
      ui.populateSearchPhoto(data)
  
    })
    .catch(err =>{
      console.log(err)
    })
}else{
  pexel.getCuratedPhotos(page)
  .then(data => {
    
    ui.populatePhoto(data)

  })
  .catch(err =>{
    console.log(err)
  })



}


e.preventDefault();

}
