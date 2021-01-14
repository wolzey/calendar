// import { expect } from "chai";

import methods from "./methods";

describe("Methods", function() {
  it("should return the correct day of the week for the beginning of the month", function() {
    const cases = [
      {
        year: 2012,
        month: 2,
        expected: 0
      },
      {
        year: 2013,
        month: 2,
        expected: 2
      },
      {
        year: 2014,
        month: 2,
        expected: 4
      }
    ];

    cases.forEach(({ year, month, expected }) => {
      console.log(methods.startingDayInWeek(year, month), expected);
      // expect(methods.startingDayInWeek(year, month)).to.equal(expected);
    });
  });
});
