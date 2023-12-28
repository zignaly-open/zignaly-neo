import { filters, returnsFilter, coinFilter, typeFilter } from "./test/filters";
import { ZigFilterPruned } from "./types";
import { filterFns, loadFilters, pruneFilters } from "./util";

describe("components/filters/ZigFilters/util", () => {
  it("should load filters", () => {
    const savedFilterValues: ZigFilterPruned[] = [
      { id: "returns", value: [0, 12], type: "slider" },
      { id: "coin", value: "USDT", type: "select" },
    ];
    const loadedFilters = loadFilters(filters, savedFilterValues);

    expect(loadedFilters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...returnsFilter,
          ...savedFilterValues[0],
        }),
        expect.objectContaining({
          ...coinFilter,
          ...savedFilterValues[1],
        }),
        expect.objectContaining(typeFilter),
      ]),
    );
  });

  it("should load outdated filters", () => {
    const savedFilterValues: ZigFilterPruned[] = [
      { id: "returns", value: [-1, 101], type: "slider" },
    ];
    const loadedFilters = loadFilters(filters, savedFilterValues);

    expect(loadedFilters).toEqual(
      expect.arrayContaining([
        {
          ...returnsFilter,
          value: [null, null],
        },
      ]),
    );
  });

  it("should prune filters", () => {
    const prunedFilters = pruneFilters(filters);

    expect(prunedFilters).toEqual([
      {
        id: "returns",
        value: [19, 100],
        type: "slider",
      },
      {
        id: "coin",
        value: null,
        type: "select",
      },
      {
        id: "type",
        value: ["spot", "futures"],
        type: "checkbox",
      },
    ]);
  });

  describe("filterFns", () => {
    it("should provide inNumberRange", () => {
      expect(filterFns.inNumberRange([0, 2], 1)).toBe(true);
      expect(filterFns.inNumberRange([0, 2], -1)).toBe(false);
    });

    it("should provide includesString", () => {
      expect(filterFns.includesString("test ok123", "ok")).toBe(true);
      expect(filterFns.includesString("test oak123", "ok")).toBe(false);
    });
  });
});
