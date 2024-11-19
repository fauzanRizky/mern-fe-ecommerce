import React from "react";
import { useSelector } from "react-redux";
import { priceFormat } from "../utils";

const CartTotal = () => {
  const { totalCart } = useSelector((state) => state.cartState);
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <p className="flex justify-between text-sm pb-2">
          <span>Total Belanjaan</span>
          <span className="font-bold">{priceFormat(totalCart)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
