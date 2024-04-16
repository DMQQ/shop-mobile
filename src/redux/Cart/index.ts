import { createSlice } from "@reduxjs/toolkit";
import { Paging, ProductMinified } from "/@types/types";
import { addCartProduct, removeCartProduct } from "./CartHttp";
import { CalcTotalCartPrice } from "functions/CalcTotalCartPrice";

export interface Cart extends ProductMinified {
  cart_id: number;
  ammount: number;
}
const initialState = {
  cart: [] as Cart[],
  loading: false,
  error: "",
  empty: false,
  amount: 0,
  isSynced: false,

  hasMore: false,

  total: 0,
};

type State = typeof initialState;

const amount = (list: Cart[]): number =>
  list.reduce((prev, { ammount }) => prev + ammount, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart(state: State) {
      state.error = "";
      state.amount = 0;
      state.cart = [];
      state.hasMore = false;
      state.isSynced = false;
      state.loading = false;
      state.empty = false;
      state.total = 0;
    },

    setTotal(state: State, { payload }: { payload: number }) {
      state.total = payload;
    },

    setCart(state: State, { payload }: { payload: Paging<Cart> }) {
      state.loading = false;
      if (!state.isSynced) {
        state.cart = payload.results;
      } else {
        state.cart = [...state.cart, ...payload.results];
      }
      state.error = "";
      state.isSynced = true;
      state.amount = amount(state.cart);
      state.hasMore = payload.hasMore;

      if (state.cart.length > 0) state.empty = false;
    },
    setError(state: State, { payload }: { payload: string }) {
      state.loading = false;
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(removeCartProduct.fulfilled, (state, { payload }) => {
      const cart = [];

      if (payload.removeAll) {
        state.cart = [];
      } else {
        for (const product of state.cart) {
          if (product.cart_id === payload.cart_id && product.ammount > 1) {
            cart.push({ ...product, ammount: product.ammount - 1 });
          } else if (product.cart_id !== payload.cart_id) {
            cart.push(product);
          } else if (
            product.cart_id === payload.cart_id &&
            product.ammount === 1
          ) {
            continue;
          }
        }
      }

      state.cart = cart;
      state.total = CalcTotalCartPrice(cart);
      state.amount = amount(cart);
    });

    builder.addCase(addCartProduct.fulfilled, (state, { payload }) => {
      let found = false;

      for (const product of state.cart) {
        if (product.prod_id === payload.prod_id) {
          product.ammount += 1;
          state.amount += 1;
          found = true;
          break;
        }
      }

      if (!found) {
        state.cart.unshift(payload.product);
        state.amount += 1;
      }

      state.total = CalcTotalCartPrice(state.cart);
    });
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;
