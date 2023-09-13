"use strict";
const { MarkovMachine } = require("./markov");

let source;
let machine;

//test for getChains
describe('getChains', function () {

  beforeAll(function () {
    source = 'The cat in the hat.';
    machine = new MarkovMachine(source);
  });

  test('returns valid chain', function () {
    const chains = machine.getChains();
    expect(chains).toEqual(
      {
        "The": ["cat"],
        "cat": ["in"],
        "in": ["the"],
        "the": ["hat."],
        "hat.": [null],
      }
      );
    });

  });


  //test for getText
  describe('getText', function () {
    let firstWord;
    let chain;
    let text;

    beforeAll(function () {
      source = 'The cat is in the hat. The cat is the cat. The hat is a cat.';
      machine = new MarkovMachine(source);

      firstWord = machine.words[0];
      chain = machine.getChains()
    });

    beforeEach(function() {
      text = machine.getText();
    })

    test('text starts with correct word', function() {
      //TODO:can assert that the text you got from generator contains the first word
        //expect().toContain()
      const testFirstWord = text.split(' ')[0];

      expect(testFirstWord).toEqual(firstWord);
    })

    test('has valid second word', function () {
      const testFirstWord = text.split(' ')[0];
      const testSecondWord = text.split(' ')[1];

      const containsWord = chain[testFirstWord].includes(testSecondWord);
      //TODO: could refactor with 'toBeTrue()';
      expect(containsWord).toEqual(true);
    });

    test('text ends with correct word', function () {
      const testLastWord = text.split(' ').splice(-1);

      const containsNull = chain[testLastWord].includes(null);
      expect(containsNull).toEqual(true);
    });

    //TODO: could have another test to see that text you get back is valid text
      //could also do a test with a source that produces only one potential outcome

});