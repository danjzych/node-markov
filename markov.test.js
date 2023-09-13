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