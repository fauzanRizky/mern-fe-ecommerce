import axios from "axios";
import customAPI from "../api.js";
import { useState, useEffect } from "react";
import Cart from "../components/Cart.jsx";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Hero } from "../components/Hero.jsx";

// try {
//   const data = await axios.get("/api/v1/product");
//   console.log(data);
// } catch (error) {
//   console.log(error);
// }

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");

  const products = data.data;

  return { products };
};

const homeView = () => {
  // const [products, setProducts] = useState([]);

  const { products } = useLoaderData();

  // const getProducts = async () => {
  //   try {
  //     const { data } = await customAPI.get("/product?limit=3");
  //     setProducts(data.data);
  //     console.log(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-secondary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products.map((item) => (
          <Cart item={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default homeView;
