// Swahili language parser -- swahili-parser.js
// Parses a Swahili phrase into syllables
// By: Sean Miller
// 2018-05-24

export class SwahiliParser {

  /**
   * Verifies that a char is not a vowel
   * @param {string} letter A swahili letter
   * @return {boolean} A boolean of whether the char is not a variable
   */
  static isNotVowel(letter) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return !vowels.includes(letter);
  }

  /**
   * Parses a Swahili word into an array of its syllables
   * @param {string} word A swahili word
   * @return {Array<string>} An array of the syllables of the original word
   */
  static parseWordIntoSyllables(word) {
    const syllablesOfWord = [];
    const wordCopy = word;
    let currentSyllable = '';
    let firstVowel = '';
    let vowelIndex = 0;
  
    while (word !== '') {
      vowelIndex = 0;
      while(this.isNotVowel(word.charAt(vowelIndex))) {
        vowelIndex++;
        
        // check if word ends with a consonant
        // in Swahili, this does not happen often if ever
        if (vowelIndex === wordCopy.length) {
          syllablesOfWord.push(word.charAt(vowelIndex));
          return syllablesOfWord;
        }
      }
      // vowel has been found, current syllable is substring from 
      // beginning to current vowel 
      // NOTE: maybe some syllables end in m or n?
      currentSyllable = word.substr(0, vowelIndex + 1);
      syllablesOfWord.push(currentSyllable);
  
      // now, cut the word into the string of the rest of the syllables
      word = word.substr(vowelIndex + 1);
    }
    return syllablesOfWord;
  }

  /**
   * Parses a Swahili sentence into an array of its syllables
   * @param {string} sentence A sentence in Swahili
   * @return {Array<string>} An array of the syllables of the original sentence
   */
  static parseSentenceIntoSyllables(sentence) {
    const syllablesOfSentence = [];
    const words = sentence.split(' ');

    for (word of words) {
      syllablesOfSentence.push(this.parseWordIntoSyllables(word));

      // push an empty syllable to signify a pause between words
      syllablesOfSentence.push(' ');
    }

    // there will be 1 empty syllable too many, so pop that one
    syllablesOfSentence.pop()

    return syllablesOfSentence;
  }

}
