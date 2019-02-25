var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var sharedMomentsArea = document.querySelector('#shared-moments');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){

      if(choiceResult.outcome=='dismissed'){
        console.log('User cancelled');
      }
      else{
        console.log("User consfirmed");
      }
    });
    deferredPrompt=null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);


//Enables to cache on demand
// function onSaveButtonClicked(event){
//   if('caches' in window){
//     caches.open('user-requested').then(function(cache){
//       cache.add('https://httpbin.org/get');
//       cache.add('./src/images/sf-boat.jpg');
//     });
//   }
//   console.log("clciked");
// }

function clearCards(){
  while(sharedMomentsArea.hasChildNodes()){
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url(' + data.image +  ')';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color="white";
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent="Save"; 
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}


function updateUI(data){
  clearCards();
  for(var i = 0; i < data.length; i++){
    createCard(data[i])
  }
}
var url="https://pwagram-7363c.firebaseio.com/posts.json";
var networkDataRecieved = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataRecieved=true;
    console.group("from web",data);
    
    var dataArray = [];
    for(var key in data){
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
      });


if('caches' in window){
      caches.match(url).then(function(res){ 
          return res.json();
      }).then(function(data){
        console.log("from caches",data);
        if(!networkDataRecieved){
          
        var dataArray= [];
        for(var key in data){
          dataArray.push(data[key]);
        }
        updateUI(dataArray);
        }
      });
    }