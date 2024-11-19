import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "../api";
import { FaPlus } from "react-icons/fa6";
import { generateSelectAmount, priceFormat } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const detailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  //Storage
  const dispatch = useDispatch();

  const amountHandler = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productData = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  // const priceFormat = (price) => {
  //   const rupiahFormat = new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //   }).format(price);
  //   return rupiahFormat;
  // };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const cartHandler = () => {
    dispatch(addItem({ product: productCart }));
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <section>
      <div className="card lg:card-side bg-base-200 shadow-xl">
        <figure>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-[400px] h-[500px] object-cover"
            />
            {product.stock < 1 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-4xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="text-3xl text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary mt-2">{product.category}</span>
          <span className="mt-3 font-bold">Stok : {product.stock}</span>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            {product.stock > 0 && (
              <>
                <label className="form-control">
                  <label className="label p-2">
                    <span className="capitalize label-text">Amount&nbsp;</span>
                    <select
                      name="amount"
                      className="select select-bordered"
                      onChange={amountHandler}
                    >
                      {generateSelectAmount(product.stock)}
                    </select>
                  </label>

                  <button
                    onClick={cartHandler}
                    className="btn btn-primary btn-md"
                  >
                    <FaPlus /> Keranjang
                  </button>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default detailProduct;
