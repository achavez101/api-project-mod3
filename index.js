// Asynchronous JavaScript

// (check) A function that uses the fetch() API
// (check) A function that is using promises and interacting with promises
// (check) Use of .then() method
// (check) Use of the .json() method
// (check) Use of Promise.all() and Promise.any()
// (check) Use of async and await keywords
// (check) A function that uses web-workers
// (check) DOM methods


const API_URL = 'https://api.quotable.io/random'

const quoteContainer = document.querySelector('.quote');
const newQuoteBtn = document.querySelector('.new-quote-btn');
document.addEventListener('DOMContentLoaded', fetchQuote)

newQuoteBtn.addEventListener('click', fetchQuote)

async function fetchQuote(){
    try {
        const result = await fetch(API_URL)
        const quote = await result.json()
        quoteContainer.innerHTML = `
            <p>${quote.content}</p>
            <cite><strong>Author:</strong> ${quote.author}</cite>
            <p><strong>Type of Quote:</strong> ${quote.tags[0]}</p>
            <p><strong>Date Added:</strong> ${quote.dateAdded}</p>
        `
        localStorage.setItem(quote, JSON.stringify(quote));
        // console.log(quote);
    } catch (error) {
        console.error('no quote');
    }
}
fetchQuote();


// quotes with less than 50 characters
const API_type = 'https://api.quotable.io/quotes/random?maxLength=50'

const typeContainer = document.querySelector('.typeQuote');
const newTypeBtn = document.querySelector('.type-quote-btn');
document.addEventListener('DOMContentLoaded', typeQuote);

newTypeBtn.addEventListener('click', typeQuote)

async function typeQuote(){
    try {
        const typeResult = await fetch(API_URL)
        const typeQuote = await typeResult.json()
        typeContainer.innerHTML = `
            <p>${typeQuote.content}</p>
            <cite><strong>Author:</strong> ${typeQuote.author}</cite>
            <p><strong>Type of Quote:</strong> ${typeQuote.tags[0]}</p>
            <p><strong>Date Added:</strong> ${typeQuote.dateAdded}</p>
        `
        localStorage.setItem(typeQuote, JSON.stringify(typeQuote));
        // console.log(quote);
    } catch (error) {
        console.error('no quote for type');
    }
}
typeQuote();


// web worker 
// followed by a button to start and stop an action
var worker;

function startWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(worker) == "undefined") {
      worker = new Worker("worker.js");
    }
    worker.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } 
  else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
  }
}

function endWorker() { 
    // terminate button on click of corresponding button
    worker.terminate();
    worker = undefined;
}

// Promise
// background color change
const color = (backgroundChange, resolved) => {
  return new Promise((resolve, reject) => {
    if (resolved) {
        setTimeout(() => resolve(backgroundChange), resolved);
    } else {
      // returns resolved promise without any delay
      resolve(backgroundChange); 
    }
  })
}
// starts at original color
color("#afb4ad")
.then((backgroundChange) => {
    console.log('Original color', "hex-value: " + backgroundChange);
    document.body.style.backgroundColor = backgroundChange;
     //returns a resolved promise after (10 second timeout)
  return color("#848871", 5000);
})
// executes after 10 seconds
.then((backgroundChange) => {
  document.body.style.backgroundColor = backgroundChange;
})

// Promise for Welcome Title
// let 2 seconds go by before releasing the title
setTimeout(function() { welcomeFunction("Welcome!"); }, 2000);

function welcomeFunction(value) {
  document.getElementById("promise").innerHTML = value;
}

// Print promise to console
Promise.all([
  color,
  welcomeFunction
])
.then(dataArray => {
  localStorage.setItem("Promise All Data", dataArray);
  console.log("Promise All Data", dataArray);
})
.catch(error => {
  console.log('Error', error)
})

// Promise Any
const promises = [color, welcomeFunction];
Promise.any(promises).then((values) => console.log(values));

// Activity for Likes
fetch("http://www.boredapi.com/api/activity")
.then(response => response.json())
.then (object => {
  displayActivities(object);
});

function displayActivities(object) {
  const activityList = document.getElementById('like-list');
  const APIMove = document.createElement('p');
  APIMove.innerTML = object.activity;

  const heartButton = document.createElement('button');
  heartButton.innerHTML = "Like" + '<i class="fa-solid fa-heart fa-sm"></i>';


  const likeCount = document.createElement('p');
  
  let likes = 0;

  function increaseLikes() {
    likes++; 
    if(likes == 1) {
      likeCount.innerHTML = `${likes} like`;
    }
    else if (likes != 1) {
      likeCount.innerHTML = `${likes} likes`;
    }
  }
  heartButton.addEventListener('click', increaseLikes);
  APIMove.appendChild(heartButton); 
  APIMove.appendChild(likeCount);
  activityList.appendChild(APIMove);
}



// API failed to work
// async function fetchQuote(){
//     try {
//     //   const quote = document.getElementById('#quoteName');
//       const result = await fetch('https://zenquotes.io/api/random');
//       const quote = await result.json();
//       console.log(quote);
//     } catch (error) {
//       console.error('no quote');
//     }
// }
// fetchQuote();

// try new api
// const API_URL = 'https://zenquotes.io/api/random';