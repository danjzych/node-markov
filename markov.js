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
    const chain = {};

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];

      if (currWord in chain) {
        chain[currWord].push(this.words[i + 1] || null);
      } else {
        chain[currWord] = [this.words[i + 1] || null] ;
      }
    }

    return chain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let result = [this.words[0]];
    let lastWord = this.words[0];

    while(lastWord !== null){
      let possibleWords = this.chains[lastWord];
      let random = Math.floor(Math.random() * possibleWords.length);
      lastWord = possibleWords[random];

      if(lastWord !== null){
        result.push(lastWord);
      }

    }
    return result.join(" ");
  }
}

module.exports = {
  MarkovMachine,
}