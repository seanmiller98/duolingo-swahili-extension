// Background script -- background.js
// Listens for mutations in the DOM and triggers the sentence
// parser if it senses a mutation
// By: Sean Miller
// 2018-06-03



// Duolingo test field; this is where the test sentence is located in the DOM
const targetNode =
  document.querySelector('div[data-test="challenge challenge-translate"]');
// const targetNode = document.querySelector('div[class="_3GXmV _1sntG"]');



// // Parse the text of the element into its individual words, filtering
// // out any whitespace and special characters
// let sentence = targetNode.innerText;
// sentence = sentence.toLowerCase();
// sentence = sentence.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi,
// ''); sentence = sentence.split(/[\r\n]+/); sentence =
// sentence.filter(function (word) {
//   return (word !== "");
// });

// // We must trim the words once again to remove leading whitespace
// for (let word = 0; word < sentence.length; word++) {
//   sentence[word] = sentence[word].trim();
// }

// function addObserverIfDesiredNodeAvailable() {
//   var targetNode =
//       document.querySelector('div[data-test="challenge-translate-prompt]');
//   if (!targetNode) {
//     // The node we need does not exist yet.
//     // Wait 500ms and try again
//     window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
//     return;
//   }
//   var config = {attributes: true, characterData: true};

//   // Create an observer instance linked to the callback function
//   var observer = new MutationObserver(function(mutations) {
//     console.log('hi marc');
//     alert('Hey');
//   });

//   // Start observing the target node for configured mutations
//   observer.observe(targetNode, config);
// }
// addObserverIfDesiredNodeAvailable();

// let testContainer;
// let pageLoaded = false;

// document.addEventListener("load", () => {
// testContainer = document.querySelector('div[data-test="challenge
// challenge-translate"]');
//   pageLoaded = true;
// });

// document.addEventListener("load", () => {
// testContainer = document.body;
// pageLoaded = true;
// });

// // if (pageLoaded) {
var config = {
  attributes: true,
  childList: true,
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(function (mutations) {
  for (mutation of mutations) {
    // if ((mutation.target.innerText).toString().test('Write this in English')) {
    console.log(mutation.target.innerText);
    // }
    // console.log(mutation.target.innerText);
  }
});

// Start observing the target node for configured mutations
observer.observe(document.body, config);
// }
