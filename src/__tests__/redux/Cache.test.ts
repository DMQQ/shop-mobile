import { cacheSlice } from "redux/Cache/Cache";

describe("Cache", () => {
  it("should set cache with key", () => {
    const state = { cache: {} };
    const key = "key";

    const data = { name: "name" };

    const result = cacheSlice.reducer(
      state,
      cacheSlice.actions.setCacheWithKey({ key, data })
    );

    expect(result).toEqual({ cache: { key: data } });

    const key2 = "key2";

    const data2 = { name: "name2" };

    const result2 = cacheSlice.reducer(
      result,
      cacheSlice.actions.setCacheWithKey({ key: key2, data: data2 })
    );

    expect(result2).toEqual({ cache: { key: data, key2: data2 } });

    const key3 = "key";

    const data3 = { name: "name3" };

    const result3 = cacheSlice.reducer(
      result2,
      cacheSlice.actions.setCacheWithKey({ key: key3, data: data3 })
    );

    expect(result3).toEqual({ cache: { key: data3, key2: data2 } });

    const result4 = cacheSlice.reducer(
      result3,
      cacheSlice.actions.clearCache()
    );

    expect(result4).toEqual({ cache: {} });

    cacheSlice.reducer(
      result4,
      cacheSlice.actions.setCacheWithKey({ key: key3, data: data3 })
    );

    const result5 = cacheSlice.reducer(
      result4,
      cacheSlice.actions.removeCacheWithKey(key3)
    );

    expect(result5).toEqual({ cache: {} });

    const result6 = cacheSlice.reducer(
      result5,
      cacheSlice.actions.setCacheWithKey({ key: key3, data: data3 })
    );

    expect(result6).toEqual({ cache: { key: data3 } });

    const data4 = { name: "name4" };

    const result7 = cacheSlice.reducer(
      result6,
      cacheSlice.actions.updateCache({ key: key3, data: data4 })
    );

    expect(result7).toEqual({ cache: { key: data4 } });

    const result8 = cacheSlice.reducer(
      result7,
      cacheSlice.actions.clearCache()
    );

    expect(result8).toEqual({ cache: {} });
  });
});
