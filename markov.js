"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1]

      if (currWord in chains) {
        chains[currWord].push(nextWord || null);
      } else {
        chains[currWord] = [nextWord || null] ;
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let result = [];
    let lastWord = this.words[0];

    while(lastWord !== null){
      result.push(lastWord);

      let possibleWords = this.chains[lastWord];
      let random = this.getRandom(possibleWords);
      lastWord = possibleWords[random];

    }
    return result.join(" ");
  }

  getRandom(words){
    return Math.floor(Math.random() * words.length)
  }
}


module.exports = {
  MarkovMachine,
}