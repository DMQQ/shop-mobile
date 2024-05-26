import {
  searchSlice,
  initialState,
  getSearchedProducts,
} from "redux/Search/search";

describe("Search", () => {
  const searchOptions = {
    searchedText: "test",
    skip: 0,
    isInfiniteScroll: false,
    token: "",
    filters: {
      category: "All",
      price: { min: 0, max: 0 },
      sorting: "newest",
    },
  };

  test("Set search", () => {
    const state = { ...initialState };
    const data = {
      hasMore: false,
      results: [{ ammount: 1, price: 10 }],
    } as any;
    const result = searchSlice.reducer(
      state,
      getSearchedProducts.fulfilled(data, "requestId", searchOptions)
    );
    expect(result.response).toEqual(data);
    expect(result.isLoading).toBe(false);
    expect(result.isChanged).toBe(true);
    expect(result.error).toBe("");
    expect(result.skip).toBe(0);
    expect(result.searchedText).toBe("");
  });

  //   test("Infinite scroll", () => {
  //     const state = { ...initialState };
  //     const data = {
  //       hasMore: true,
  //       results: [{ ammount: 1, price: 10, prod_id: 1 }],
  //     } as any;
  //     const result = searchSlice.reducer(
  //       state,
  //       getSearchedProducts.fulfilled(data, "", {
  //         ...searchOptions,
  //         isInfiniteScroll: true,
  //       })
  //     );
  //     expect(result.response).toEqual(data);

  //     const result2 = searchSlice.reducer(
  //       result,
  //       getSearchedProducts.fulfilled(
  //         {
  //           hasMore: true,
  //           //@ts-ignore
  //           results: [{ ammount: 1, price: 20, prod_id: 2 }],
  //         },
  //         "",
  //         { ...searchOptions, isInfiniteScroll: true }
  //       )
  //     );

  //     expect(result2.response.results.length).toBe(2);
  //   });
});
