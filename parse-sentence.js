// Swahili sentence parser -- parse-sentence.js
// Parses a Swahili sentence into syllables, then
// output the audio for each syllable
// By: Sean Miller
// 2018-05-24

const sentenceXPath = '/span[@data-test="hint-sentence"]';

// get text from sentence
// const sentence = document.evaluate(sentenceXPath, document, )


const consonants = [
  'ch', 'd',  'f',  'g',    'h',  'j',  'k',  'l',  'm',  'n',  'p',
  'r',  's',  't',  'v',    'w',  'y',  'z',  'dh', 'gh', 'kh', 'mb',
  'mv', 'nd', 'ng', 'ng\'', 'nj', 'ny', 'nz', 'sh', 'th'
];

const vowels = ['a', 'e', 'i', 'o', 'u'];

let phonemes = [];

for (consonant of consonants) {
  for (vowel of vowels) {
    phonemes.push(consonant + vowel);
  }
}

for (vowel of vowels) {
  phonemes.push(vowel);
}

/**
 * Parses a Swahili sentence into an array of its syllables
 * @param {string} sentence A swahili sentence
 * @return {Array<string>} An array of the syllables of the original sentence
 */
const parseSyllables = (sentence) => {
  let syllables = [];
}