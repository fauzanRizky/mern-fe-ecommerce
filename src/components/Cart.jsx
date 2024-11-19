import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { useState, useEffect } from "react";
import { priceFormat } from "../utils";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import customAPI from "../api";
import { toast } from "react-toastify";

const Cart = ({ item, user }) => {
  const { revalidate } = useRevalidator();
  // const [products, setProducts] = useState([]);

  //   const getProducts = async () => {
  //     try {
  //       const { data } = await customAPI.get("/product?limit=3");
  //       setProducts(data.data);
  //       console.log(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // const priceFormat = (price) => {
  //   const rupiahFormat = new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //   }).format(price);
  //   return rupiahFormat;
  // };

  //   useEffect(() => {
  //     getProducts();
  //   }, []);

  return (
    <>
      <div className="card card-compact bg-base-200 shadow-xl" key={item._id}>
        <figure>
          <div className="relative">
            <img src={item.image} alt="Shoes" />
            {item.stock < 1 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-4xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          {user && user.role === "owner" && (
            <div className="flex justify-end gap-x-3">
              <FaTrash
                onClick={async () => {
                  await customAPI.delete(`/product/${item._id}`);
                  toast.info(`Berhasil menghapus produk ${item.name}`);
                  revalidate();
                }}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/product/${item._id}/edit`}>
                <FaPencilAlt className="text-info cursor-pointer" />
              </Link>
            </div>
          )}

          <h2 className="card-title">{item.name}</h2>
          <p>{item.description.substring(0, 25)}</p>
          <p className="font-bold text-warning">{priceFormat(item.price)}</p>
          <div className="card-actions justify-end">
            <Link to={`/product/${item._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      {/*     
      <div className="card bg-base-200 shadow-xl" key={item._id}>
        <figure>
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary">
            {item.name}
            <div className="badge badge-secondary">
              {priceFormat(item.price)}
            </div>
          </h2>
          <p>{item.description.substring(0, 25)}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{item.category}</div>
            
          </div>
        </div>
      </div>
    */}
    </>
  );
};

export default Cart;
