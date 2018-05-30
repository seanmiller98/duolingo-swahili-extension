chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'duolingo.com/skill/sw/' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// some random class ID created by Duolingo for the main
// testing field
const targetNode = document.getElementsByClassName('_1gcJT _2hYEZ');

const config = {
  attributes: true,
  childList: true
};

const callback = function (mutationsList) {
  // for (var mutation of mutationsList) {
  //   if (mutation.type == 'childList') {
  //     console.log('A child node has been added or removed.');
  //   }
  //   else if (mutation.type == 'attributes') {
  //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
  //   }
  // }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
