import { createSlice } from "@reduxjs/toolkit";

type State = {
  cache: {
    [key: string]: any;
  };
};

const initialState: State = {
  cache: {},
};

type SetCacheType = {
  payload: {
    key: string;
    data: any;
  };
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setCacheWithKey: (state: State, { payload }: SetCacheType) => {
      const copy = { ...state.cache };

      copy[payload.key] = payload.data;

      state.cache = copy;
    },

    removeCacheWithKey: (state: State, { payload }: { payload: string }) => {
      const copy = { ...state.cache };

      delete copy[payload];

      state.cache = copy;
    },

    clearCache: (state: State) => {
      const copy = { ...state.cache };
      Object.keys(copy).forEach((key) => {
        delete copy[key];
      });

      state.cache = copy;
    },

    updateCache: (state: State, { payload }: SetCacheType) => {
      const copy = { ...state.cache };

      copy[payload.key] = payload.data;

      state.cache = copy;
    },
  },
});

export const cacheReducer = cacheSlice.reducer;
export const cacheAction = cacheSlice.actions;
