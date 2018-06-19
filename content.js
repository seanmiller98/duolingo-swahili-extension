// Content script -- content.js
// Listens for mutations in the DOM and triggers the sentence
// parser if it senses a mutation; it then sends the
// collection of syllables to background.js to be output
// as audio
// By: Sean Miller
// 2018-06-03

// We want to listen to mutations of the document's children
// and grandchildren, etc.
const config = {
  childList: true,
  subtree: true
};

/**
 * Cleans up the gross format of the inner text of the Duolingo
 * test field
 * @param {string} sentence An unformatted mess of a sentence
 * @return {string} The proper string respresentation of the sentence
 */
function cleanUpDuolingoSentence(sentence) {
  sentence = sentence.toLowerCase();
  sentence = sentence.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
  sentence = sentence.split(/[\r\n]+/);
  sentence = sentence.filter(function(word) {
    return word !== '';
  });
  return sentence;
}

// function used to solve the bug where too many mutations get triggered when a 
// test screen changes
const timeout = waitInMilSecs => new Promise((resolve) => setTimeout(resolve, waitInMilSecs));

let oldSentence = '';

// Create an observer instance linked to the callback function
const observer = new MutationObserver( async function(mutations) {
  // check to see if desired test is present
  // this is more complicated than it sounds... we must
  // check that it either just became a Swahili challenge,
  // or that it is remaining a Swahili challenge by
  // searching through the added/removed nodes of the
  // mutations

  // always make sure that the mutations are only being observed on pages where
  // the user is learning Swahili
  if (JSON.parse(localStorage['duo.state']).user.learningLanguage === 'sw') {
    let isNewSwahiliChallenge = false;
    let isStillSwahiliChallenge = false;
    let isSwahiliChallenge = false;
    let wasEnglishChallenge = false;

    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        if (addedNode.innerText !== undefined) {
          if (addedNode.innerText.search(/write this in english/gi) !== -1) {
            isNewSwahiliChallenge = true;
          }
        }
      }

      if (!isNewSwahiliChallenge) {
        for (let removedNode of mutation.removedNodes) {
          if (removedNode.innerText !== undefined) {
            if (removedNode.innerText.search(/write this in english/gi) !==
                -1) {
              if (document.body.innerText.search(/write this in english/gi) !==
                  -1) {
                isStillSwahiliChallenge = true;
              }
            }
          }
        }
      } 
    }

    // in either of the 2 possible 2 cases, we want the sentence audio to play 
    // and to set up mouseover listeners for the words. Proceed!
    if (isStillSwahiliChallenge || isNewSwahiliChallenge) {
      isSwahiliChallenge = true;
    }

    if (isSwahiliChallenge) {
      
      // short wait to filter out any "noise" mutations that occur before the
      // test page fully loads
      if (document.body.innerText.search(/write this in english/gi)) {
        await timeout(400);
      }

      // This is where the test sentence is located in the DOM
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

      // finally, send the array of words to the background script to be
      // output as audio
      if (oldSentence !== sentenceString) {
        // if ((document.body.innerText.search(/Correct solution/gi) === -1) &&
        //     (document.body.innerText.search(/you are correct/gi) === -1))
        // {
          oldSentence = sentenceString;
          chrome.runtime.sendMessage({toSay: sentenceString}, function() {});
        // }


        // the proper CSS selector to extract the individial words of the
        // sentence
        const words = targetNode.querySelectorAll('span>span');

        // set up mouse-enter listeners for each of the child words
        // of the sentence prop
        for (let i = 0; i < words.length; i++) {
          if (words[i].innerText !== ' ' &&
              words[i].assignedMouseOver === undefined) {
            words[i].assignedMouseOver = true;
            words[i].addEventListener('mouseover', function() {
              chrome.runtime.sendMessage(
                  {toSay: cleanUpDuolingoSentence(words[i].innerText)[0]},
                  function() {});
            });
          }
        }

        // set up mouse-leave listeners for each of the child words
        // of the sentence prop... this is sort of a hack to get
        // the background script to keep track of the fact that
        // the last "spoken" word was actually nothing
        for (let i = 0; i < words.length; i++) {
          if (words[i].assignedMouseLeave === undefined) {
            words[i].assignedMouseLeave = true;
            words[i].addEventListener('mouseleave', function() {
              chrome.runtime.sendMessage({toSay: ''}, function() {});
            });
          }
        }
      }
    }
  }
});

// Start observing the target node for configured mutations
observer.observe(document.body, config);
