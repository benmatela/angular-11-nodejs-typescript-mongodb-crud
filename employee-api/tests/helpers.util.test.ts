import "mocha";
import { expect } from "chai";

import helpers from '../src/util/helpers';
import { Characters } from "../src/models/enums/characters.enum";

describe("UtilHelpers", () => {
  describe("RandomGenerator", () => {
    it("should generate 2 random uppercased letters", () => {
        const letters = helpers.randomGenerator(2, Characters.ALPHABETS);
        expect(letters).to.be.a('string');
        expect(letters.length).to.be.equal(2);
        expect(letters).to.be.equal(letters.toUpperCase());
    });

    it("should generate 4 random numbers", () => {
        const numbers = helpers.randomGenerator(4, Characters.NUMBERS);
        expect(Number(numbers)).to.be.a('number');
        expect(numbers.length).to.be.equal(4);
    });
  });
});
