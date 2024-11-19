import React from "react";
import { generateSelectAmount, priceFormat } from "../utils";
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cartSlice";

const CartListItems = ({ cartItem }) => {
  const { cartId, name, price, image, stock, amount } = cartItem;
  const dispatch = useDispatch();
  const amountHandler = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  const removeItemHandler = () => {
    dispatch(removeItem({ cartId }));
  };
  return (
    <>
      <article
        key={cartId}
        className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
      >
        <img
          src={image}
          alt={name}
          className="h-24 w-24 rounded-lg sm:w-32 sm:h-32 object-cover"
        />
        <div className="sm:ml-16 sm:w-48">
          <h2 className="capitalize">{name}</h2>
          <span className="font-bold">Jumlah {amount} produk</span>
        </div>
        <p className="font-bold sm:ml-auto">{priceFormat(price)}</p>
        <div className="sm:ml-12">
          <div className="form-control max-w-xs">
            <select
              name="amount"
              className="select select-bordered sm:w-full"
              value={amount}
              onChange={amountHandler}
            >
              {generateSelectAmount(stock)}
            </select>
          </div>
          <button
            className="mt-2 btn btn-secondary btn-block"
            onClick={removeItemHandler}
          >
            <FaTrash />
          </button>
        </div>
      </article>
    </>
  );
};

export default CartListItems;
