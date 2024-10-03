export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const closeCart = () => {
  return {
    type: 'CLOSE_CART',
  };
};

export const INCREASE_ITEM_QUANTITY = 'INCREASE_ITEM_QUANTITY';

export const increaseItemQuantity = (id) => ({
  type: INCREASE_ITEM_QUANTITY,
  payload: { id },
});