import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import type { Paging, SuggestionType } from "/@types/types";
import { API } from "@constants/routes";
import removeDuplicatesById from "functions/RemoveRepetition";

interface SearchHistory {
  text: string;
  date: Date;
  id: number;
}

interface SearchState {
  searchedText: string;
  token: string;
  skip: number;
  filters: Pick<typeof initialState.filters, "category" | "price" | "sorting">;

  isInfiniteScroll: boolean;
}

interface ThunkResponse {
  hasMore: boolean;
  results: SuggestionType[];
  isError: boolean;
  error: string;

  isInfiniteScroll: boolean;
}

export const getSearchedProducts = createAsyncThunk<ThunkResponse, SearchState>(
  "search/get",
  async (args, { abort, rejectWithValue }) => {
    let response: Awaited<AxiosResponse<any, any>>;
    try {
      response = await axios.get(`${API}/products/search`, {
        headers: {
          token: args.token,
        },
        params: {
          q: args.searchedText,
          skip: args.skip,
        },
      });

      return { ...response.data, isInfiniteScroll: args.isInfiniteScroll };
    } catch (error) {
      abort();
      return rejectWithValue({});
    }
  }
);

const initialState = {
  response: {
    hasMore: false,
    results: [] as SuggestionType[],
  },

  isLoading: false,

  error: "",

  filters: {
    category: "All",
    price: {
      min: 0,
      max: 0,
    },
    sorting: "newest",
  },

  skip: 0,

  searchHistory: [] as SearchHistory[],
  searchedText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setText(state, action) {
      state.searchedText = action.payload;

      state.skip = 0;

      console.log("TEXT SET: " + action.payload);
      state.response.hasMore = true;
      state.response.results = [];
    },

    nextPage(state) {
      if (state.response.hasMore) {
        state.skip += 5;
      }
    },

    setFilter<T extends keyof typeof initialState.filters>(
      state: typeof initialState,
      action: PayloadAction<{
        key: T;
        value: (typeof initialState.filters)[T];
      }>
    ) {
      state.filters[action.payload.key] = action.payload.value;
    },

    clearAllFilters(state) {
      state.filters = initialState.filters;
    },

    clearFilter<T extends keyof typeof initialState.filters>(
      state: typeof initialState,
      action: {
        payload: T;
      }
    ) {
      state.filters[action.payload] = initialState.filters[action.payload];
    },

    setSearchHistory(state, { payload }) {
      state.searchHistory = payload;
    },
    addSearchHistory(state, { payload }) {
      state.searchHistory.push(payload);
    },

    removeSearchHistory(state, { payload }: PayloadAction<number>) {
      state.searchHistory = state.searchHistory.filter(
        (item) => item.id !== payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getSearchedProducts.fulfilled, (state, { payload }) => {
      state.response.results = payload.isInfiniteScroll
        ? removeDuplicatesById(
            [...state.response.results, ...payload.results],
            "prod_id"
          )
        : payload.results;

      state.response.hasMore = payload.hasMore;
    });

    builder.addCase(getSearchedProducts.rejected, (state, { payload }) => {});
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
