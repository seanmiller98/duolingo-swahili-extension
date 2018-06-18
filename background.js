// Background script = background.js
// Handles messages sent from content.js and output the audio
// By: Sean Miller
// 2018-06-09

import { SwahiliParser } from "./swahili-parser";

let oldSentence = 'The first sentence of all time!!1!';

// listen for a message sent from content, and then output the desired text
chrome.runtime.onMessage.addListener(function(request) {
  if (oldSentence === '' || oldSentence !== request.toSay) {
    oldSentence = request.toSay;

    const msg = new SpeechSynthesisUtterance();
    msg.text = SwahiliParser.parseSentenceIntoSyllables(request.toSay)
    msg.lang = 'id';
    msg.rate = '0.80';
    speechSynthesis.speak(msg);
  }
});