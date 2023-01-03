import { shortenNumber } from "./util";

const shortenAndCheck = (n: number, [suffix, precision]: [string, number]) => {
  const shortened = shortenNumber(n);
  expect(shortened.suffix).toBe(suffix);
  expect(shortened.precision).toBe(precision);
};

describe("shortenNumber", () => {
  it("should shorten correctly", () => {
    shortenAndCheck(0, ["", 3]);
    shortenAndCheck(1000000, ["M", 2]);
    shortenAndCheck(1234567890.123456, ["M", 1]);
    shortenAndCheck(1234.123456, ["K", 2]);
    shortenAndCheck(12345.123456, ["K", 1]);
    shortenAndCheck(12538.1083085 * 100000, ["M", 1]);
  });
});
