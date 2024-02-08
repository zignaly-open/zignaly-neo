import { shortenNumber } from "./util";

const shortenAndCheck = (n: number, [suffix, precision]: [string, number]) => {
  const shortened = shortenNumber(n);
  expect(shortened.suffix).toBe(suffix);
  expect(shortened.precision).toBe(precision);
};

describe("shortenNumber", () => {
  // eslint-disable-next-line jest/expect-expect
  it("should shorten correctly", () => {
    shortenAndCheck(0, ["", 3]);
    shortenAndCheck(1000000, ["M", 2]);
    shortenAndCheck(1234567890.123456, ["G", 2]);
    shortenAndCheck(1234.123456, ["K", 2]);
    shortenAndCheck(0.00123456, ["", 3]);
    shortenAndCheck(0.00000123456, ["μ", 2]);
    shortenAndCheck(12345.123456, ["K", 1]);
    shortenAndCheck(138.1083085 * 1000_000, ["M", 1]);
    shortenAndCheck(1.83085 * 1000_000_000, ["G", 2]);
    shortenAndCheck(13.83085 * 1000_000_000, ["G", 1]);
  });
});
