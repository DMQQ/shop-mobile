import { CalcTotalCartPrice } from "functions/CalcTotalCartPrice";

describe("CalcTotalCartPrice", () => {
  it("should return the total price of the cart", () => {
    const cart = [
      { ammount: 1, price: 10 },
      { ammount: 2, price: 20 },
    ];
    const result = CalcTotalCartPrice(cart);
    expect(result).toBe(50);
  });

  it("should return 0 if the cart is empty", () => {
    const cart = [] as any;
    const result = CalcTotalCartPrice(cart);
    expect(result).toBe(0);
  });
});
