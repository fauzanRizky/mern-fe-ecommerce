import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  cartItems: [],
  numItemsInCart: 0,
  totalCart: 0,
  // totalOrder: 0,
};

const getCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : defaultValue;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      // Cari item di keranjang berdasarkan ID
      const item = state.cartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      // Update jumlah item dan total harga
      state.numItemsInCart += product.amount;
      state.totalCart += product.price * product.amount;
      // state.totalOrder = state.totalCart;

      // Simpan ke localStorage
      localStorage.setItem("cart", JSON.stringify(state));

      // Tampilkan notifikasi
      toast.success(`Berhasil menambah ${product.amount} produk ke keranjang`);
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const productItem = state.cartItems.find(
        (item) => item.cartId === cartId
      );
      state.numItemsInCart += amount - productItem.amount;
      state.totalCart += productItem.price * (amount - productItem.amount);
      productItem.amount = amount;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.info("Keranjang belanjaan Anda berhasil diupdate!");
    },
    clearCartItems: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultValue));
      return defaultValue;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const productItem = state.cartItems.find(
        (item) => item.cartId === cartId
      );
      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId
      );

      state.numItemsInCart -= productItem.amount;
      state.totalCart -= productItem.price * productItem.amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Keranjang belanjaan Anda berhasil dihapus!");
    },
  },
});

export const { addItem, editItem, removeItem, clearCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
