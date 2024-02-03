


// Asynchronous JavaScript

// (check) A function that uses the fetch() API
// A function that is using promises and interacting with promises
// Use of .then() method
// (check) Use of the .json() method
// Use of Promise.all() and Promise.any()
// (check) Use of async and await keywords
// (check) A function that uses web-workers


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
            <p><h3>Quote</h3>${quote.content}</p>
            <cite><strong>Author:</strong> ${quote.author}</cite>
            <p><strong>Type of Quote:</strong> ${quote.tags[0]}</p>
            <p><strong>Date Added:</strong> ${quote.dateAdded}</p>
        `
        console.log(quote);
    } catch (error) {
        console.error('no quote');
    }
}
fetchQuote();


// web worker
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

let prom1 = new Promise((resolve, reject)=>{
	resolve("Successful");
})
.then(e=>{ 
			console.log(e)
			return "Completed"
	})
.then(e=>{console.log(e)})


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