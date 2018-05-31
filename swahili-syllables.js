// Swahili syllables -- swahili-syllables.js
// Array of all possible Swahili syllables
// By: Sean Miller
// 2018-05-30

export const SwahiliSyllables = [];

const consonants = [
    'ch', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p',
    'r', 's', 't', 'v', 'w', 'y', 'z', 'dh', 'gh', 'kh', 'mb',
    'mv', 'nd', 'ng', 'ng\'', 'nj', 'ny', 'nz', 'sh', 'th'
];
const vowels = ['a', 'e', 'i', 'o', 'u'];

for (consonant of consonants) {
    for (vowel of vowels) {
        SwahiliSyllables.push(consonant + vowel);
    }
}

for (vowel of vowels) {
    SwahiliSyllables.push(vowel);
}




