// Background script -- background.js
// Listens for mutations in the DOM and triggers the sentence 
// parser if it senses a mutation
// By: Sean Miller
// 2018-06-03



// Duolingo test field; this is where the test sentence is located in the DOM
const targetNode = document.querySelector('span[data-test="hint-sentence"]');


// // Parse the text of the element into its individual words, filtering
// // out any whitespace and special characters
// let sentence = targetNode.innerText;
// sentence = sentence.toLowerCase();
// sentence = sentence.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
// sentence = sentence.split(/[\r\n]+/);
// sentence = sentence.filter(function (word) {
//   return (word !== "");
// });

// // We must trim the words once again to remove leading whitespace
// for (let word = 0; word < sentence.length; word++) {
//   sentence[word] = sentence[word].trim();
// }

var testContainer = document.querySelector('span[data-test="challenge challenge-translate"]');

var config = {
  attributes: true,
  childList: true
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(function (mutations) {
  console.log('hi marc');
});

// Start observing the target node for configured mutations
observer.observe(targetNode, config);