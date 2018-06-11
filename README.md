# Duolingo Swahili+
Chrome extension which provides audio recordings for the Swahili exercises on 
Duolingo.

### How does it Work? ###
The way this extension works at a high level is like this:
1. Create a background script that waits for messages to be sent from a 
content script, and inject a content script into the webpage when the URL
is of the form ...duolingo.com/sw/skills/...
2. When the content script is injected into the webpage, create an HTML5
DOM MutationObserver which will get triggered whenever a mutation occurs to
the webpage's DOM.
3. Detect whether the mutation involves the creation of a "Write this in English"
test field. If it does, then send the text contained in the text field to the
background script via a Chrome message.
4. The background script receives the text to output, creates a SpeechSynthesisUtterance
object, and ouputs the audio. It then waits for the process to be repeated.

### But what about the Text-To-Speech problem? ###
By far the trickiest challenge is outputting the text as speech; as of now, Chrome 
does not support TTS (text-to-speech) for Swahili, so my crazy work-around after
lots of research on how to best approach this difficulty works as follows:
1. Convert the sentence into a collection of its syllables via a Swahili
word syllable processing algorithm
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

### How to contribute ###
This project is licensed under the MIT license and I strongly encourage anyone to 
try to improve the extension via pull-requests, but perhaps even more importantly, 
I recommend to anyone to use this project as a template to create audio extensions
for the several other courses offered on Duolingo without audio!
