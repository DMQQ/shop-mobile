import { addCartProduct, removeCartProduct } from "redux/Cart/CartHttp";
import { Paging } from "/@types/types";
import { Cart, cartSlice, initialState } from "redux/Cart";
import axios from "axios";

describe("Cart", () => {
  test("Set cart", () => {
    const state = { ...initialState };
    const data = {
      hasMore: false,
      results: [{ ammount: 1, price: 10 }],
    } as Paging<Cart>;
    const result = cartSlice.reducer(state, cartSlice.actions.setCart(data));
    expect(result.cart).toEqual(data.results);
    expect(result.hasMore).toBe(data.hasMore);
    expect(result.amount).toBe(1);

    const data2 = {
      hasMore: false,
      results: [{ ammount: 1, price: 20 }],
    } as Paging<Cart>;

    const result2 = cartSlice.reducer(result, cartSlice.actions.setCart(data2));

    expect(result2.cart).toEqual([...data.results, ...data2.results]);

    expect(result2.amount).toBe(2);
  });

  test("Set total", () => {
    const state = { ...initialState };
    const total = 10;
    const result = cartSlice.reducer(state, cartSlice.actions.setTotal(total));
    expect(result.total).toBe(total);
  });

  test("Set error", () => {
    const state = { ...initialState };
    const error = "error";
    const result = cartSlice.reducer(state, cartSlice.actions.setError(error));
    expect(result.error).toBe(error);
  });

  test("Clear cart", () => {
    const state = { ...initialState };
    const result = cartSlice.reducer(state, cartSlice.actions.clearCart());
    expect(result).toEqual(initialState);
  });
});

describe("Cart Http", () => {
  test("Remove cart product", () => {
    const state = {
      cart: [
        { cart_id: 1, ammount: 1 },
        { cart_id: 2, ammount: 2 },
      ],
    } as any;
    const input = { cart_id: 1, removeAll: false };
    const result = cartSlice.reducer(
      state,
      removeCartProduct.fulfilled(
        { isDeleted: true, removeAll: false, cart_id: 1 },
        "",
        input
      )
    );
    expect(result.cart).toEqual([{ cart_id: 2, ammount: 2 }]);

    const input2 = { cart_id: 2, removeAll: false };

    const result2 = cartSlice.reducer(
      result,
      removeCartProduct.fulfilled(
        { isDeleted: true, removeAll: false, cart_id: 2 },
        "",
        input2
      )
    );
    expect(result2.cart).toEqual([{ cart_id: 2, ammount: 1 }]);

    const input3 = { cart_id: 2, removeAll: true };

    const result3 = cartSlice.reducer(
      result2,
      removeCartProduct.fulfilled(
        { isDeleted: true, removeAll: true, cart_id: 2 },
        "",
        input3
      )
    );

    expect(result3.cart).toEqual([]);
  });

  test("Add cart product", () => {
    const state = { cart: [] } as any;
    const result = cartSlice.reducer(
      state,
      addCartProduct.fulfilled(
        {
          isAdded: true,
          prod_id: 1,
          product: { cart_id: 1, ammount: 1, prod_id: 1 } as any,
        },
        "",
        {
          cancelToken: axios.CancelToken.source(),
          prod_id: 1,
        }
      )
    );
    expect(result.cart).toEqual([{ cart_id: 1, prod_id: 1, ammount: 1 }]);

    const result2 = cartSlice.reducer(
      result,
      addCartProduct.fulfilled(
        {
          isAdded: true,
          prod_id: 1,
          product: { cart_id: 2, ammount: 1, prod_id: 1 } as any,
        },
        "",
        {
          cancelToken: axios.CancelToken.source(),
          prod_id: 1,
        }
      )
    );

    expect(result2.cart).toEqual([{ cart_id: 1, ammount: 2, prod_id: 1 }]);
  });
});
