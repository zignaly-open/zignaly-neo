import { renderHook } from "@testing-library/react";
import { filters, returnsFilter, coinFilter, typeFilter } from "./test/filters";
import { ZigFilterPruned, ZigFiltersType } from "./types";
import { filterData, filterFns, loadFilters, pruneFilters } from "./util";
import { useFilteredCollection } from "./use";

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
      expect(filterFns.inNumberRange(1, [0, 2])).toBe(true);
      expect(filterFns.inNumberRange(-1, [0, 2])).toBe(false);
    });

    it("should provide includesString", () => {
      expect(filterFns.includesString("test ok123", "ok")).toBe(true);
      expect(filterFns.includesString("test oak123", "ok")).toBe(false);
    });

    it("should filter data", () => {
      expect(filterData(typeFilter, "test")).toEqual(false);
      expect(filterData(typeFilter, "spot")).toEqual(true);
    });
  });
});

describe("components/filters/ZigFilters/use", () => {
  it("should filter collection", () => {
    const testFilters = [{ ...coinFilter, value: "USDT" }];
    const data = [{ coin: "USDT" }, { coin: "USDC" }];
    const { result } = renderHook(() => useFilteredCollection(data, testFilters));
    expect(result.current).toEqual([{ coin: "USDT" }]);
  });

  it("should filter collection using map", () => {
    const testFilters = [coinFilter, { ...returnsFilter, value: [11, 12] }] as ZigFiltersType;
    const data = [{ pnl: 12 }, { pnl: 0 }];
    const mapper = (o: { pnl: number }) => ({ returns: o.pnl });
    const { result } = renderHook(() => useFilteredCollection(data, testFilters, mapper));
    expect(result.current).toEqual([{ pnl: 12 }]);
  });
});
