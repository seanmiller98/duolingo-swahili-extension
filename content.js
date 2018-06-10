// Background script -- background.js
// Listens for mutations in the DOM and triggers the sentence
// parser if it senses a mutation
// By: Sean Miller
// 2018-06-03

const config = {
  childList: true,
  subtree: true
};

/**
 * Verifies that a char is not a vowel
 * @param {string} letter A swahili letter
 * @return {boolean} A boolean of whether the char is not a variable
 */
function cleanUpDuolingoSentence(sentence) {
  sentence = sentence.toLowerCase();
  sentence = sentence.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
  sentence = sentence.split(/[\r\n]+/);
  sentence = sentence.filter(function(word) {
    return (word !== '');
  });
  return sentence;
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(function(mutations) {
  // check to see if desired test is present
  if (document.body.innerText.search(/write this in english/gi) !== -1) {
    console.log('A mutation has occured')

    // Duolingo test field; this is where the test sentence is located in the
    // DOM
    const targetNode =
        document.querySelector('div[data-test="challenge-translate-prompt"]');

    // Parse the text of the element into its individual words, filtering
    // out any whitespace and special characters
    sentence = targetNode.innerText;
    sentence = cleanUpDuolingoSentence(sentence);

    // We must trim the words once again to remove leading whitespace
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i].trim();
    }

    // now we must convert array of words back to a string
    let sentenceString = '';
    for (let word of sentence) {
      sentenceString += word;
      sentenceString += ' ';
    }

    // for testing purposes:
    console.log(`Sentence: ${sentenceString}`);

    // finally, send the array of words to the background script to be
    // output as audio
    // chrome.runtime.sendMessage({toSay: sentenceString}, function() {});

    // the proper CSS selector to extract the individial words of the sentence
    const words = targetNode.querySelectorAll('span>span');

    // set up mouse-enter listeners for each of the child words
    // of the sentence prop
    for (let i = 0; i < words.length; i++) {
      words[i].addEventListener('mouseenter', function() {
        console.log(words[i].innerText);
        chrome.runtime.sendMessage(
            {toSay: cleanUpDuolingoSentence(words[i].innerText)[0]},
            function() {});
      })
    }

    // set up mouse-leave listeners for each of the child words
    // of the sentence prop
    for (let i = 0; i < words.length; i++) {
      words[i].addEventListener('mouseleave', function() {
        chrome.runtime.sendMessage({toSay: ''}, function() {});
      })
    }
  }
});

// Start observing the target node for configured mutations
observer.observe(document.body, config);
