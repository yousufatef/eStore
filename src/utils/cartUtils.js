export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // CALCULATE ITEM PRICE
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // CALCULATE SHIPPING PRICE
  const shippingPrice = itemsPrice >= 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // CALCULATE TAX PRICE
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // CALCULATE TOTAL PRICE
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
