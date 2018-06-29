# Duolingo Swahili+ #
Chrome extension which provides audio recordings for the Swahili exercises on 
Duolingo.

## How does it Work? ##
The way this extension works at a high level is like this:
1. Create a background script that waits for messages to be sent from a 
content script, and inject a content script into the webpage when the URL
is of the form ...duolingo.com...
2. When the content script is injected into the webpage, create an HTML5
DOM MutationObserver which will get triggered whenever a mutation occurs to
the webpage's DOM.
3. Detect whether the mutation involves the creation of a "Write this in English"
test field. If it does, then send the text contained in the text field to the
background script via a Chrome message.
4. The background script receives the text to output, creates a SpeechSynthesisUtterance
object, and ouputs the audio. It then waits for the process to be repeated.

## But what about the Text-To-Speech problem? ##
By far the trickiest challenge is outputting the text as speech; as of now, Chrome 
does not support TTS (text-to-speech) for Swahili, so my crazy work-around after
lots of research on how to best approach this difficulty works as follows:
1. Convert the sentence into a collection of its syllables via a Swahili
word syllable processing algorithm.
2. Slightly convert the syllables in order to be read properly... by the 
Indonesian TTS service provided by Chrome.
3. Output the syllables in quick enough succession by the Indonesian TTS that
it sounds like a word.

Yes, you read that right. After countless hours of trying to figure out the best
way of working around the no-TTS-for-Swahili problem, I experimented with using the
languages that ARE provided via the SpeechSynthesisUtterance API in HTML5 that 
cooperate with Chrome. It just so happens that, although Indonesian does a 
horrible job of pronouncing full words, it actually does a pretty decent job (with 
some adjustments, as described previously) of properly outputting the correct
audio for each SYLLABLE. As crazy a hack as this is, and after many hours close to 
giving up when my syllable-splitting algorithm kept failing, it quickly became apparent
to me that this would be the only real way of working around the problem until 
Chrome supports Swahili TTS, by which point Duolingo probably will have added audio 
support anyway. 

## Contributing ##
I strongly encourage anyone to try to improve the extension via pull-requests, but perhaps even more importantly, I recommend to anyone to use this project as a template to create audio extensions for the several other courses offered on Duolingo without audio!

### Testing on Chrome ###
1. Clone the repository
2. Navigate to `chome://extensions` within Chrome
3. Select "Pack Extension"
4. Select the previously cloned directory as the "Extension root directory"
5. Click "PACK EXTENSION"
6. Click "Load Unpacked"
7. Select the same folder as before
8. Enable the extension, and click refresh for good measure
9. All done! Whenever you make a new change to the repository, simply refresh the extension to get the changes to take effect

### Testing on Firefox ###
1. Clone the repository
2. Navigate to `about:debugging` within Firefox
3. Click "Load Temporary Add-on"
4. Click any file within the previously cloned directory
5. All done! Whenever you make a new change to the repository, simply refresh the extension to get the changes to take effect

### Testing on Opera ###
1. Clone the repository
2. Navigate to `opera:extensions` within Opera
3. Click "Developer Mode"
4. Click "Pack Extension..."
5. Select the previously cloned directory as the "Extension root directory"
6. Click "Load Unpacked Extension..."
7. Select the same folder as before
8. All done! Whenever you make a new change to the repository, simply refresh the extension to get the changes to take effect


## License ##
This project is licensed under the MIT license - see LICENSE for more details.

## Acknowledgements ##
* The Duolingo team and course creators for the Swahili course. Thank you for choosing to build
a course for such an amazing language!
* Those responsible for adding SpeechSynthesis and MutationObserver's to HTML5 - none of this would have been possible without either.
* The Google Chrome Extensions team - Chrome API's have some of the best documentation I have seen, so huge shoutout to them for maintaining and documenting their API's so rigorously.


