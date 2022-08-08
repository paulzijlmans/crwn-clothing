import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = (newIsCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, newIsCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};


const findItem = (items, itemToFind) =>
  items.find((item) => item.id === itemToFind.id);

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = findItem(cartItems, productToAdd);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: existingCartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = findItem(cartItems, cartItemToRemove);
  if (existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, cartItemToRemove);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: existingCartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((item) => item.id !== cartItemToClear.id);
