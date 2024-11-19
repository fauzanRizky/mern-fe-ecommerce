import React from "react";
import customAPI from "../api";
import { useLoaderData, Link } from "react-router-dom";
import Filter from "../components/Filter";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const { data } = await customAPI.get("/product", {
    params: params,
  });

  console.log(params);

  const products = data.data;
  // console.log(products);

  const pagination = data.pagination;

  return { products, params, pagination };
};

const productView = () => {
  const user = useSelector((state) => state.userState.user);

  const { products, pagination } = useLoaderData();

  // console.log(products);
  return (
    <>
      <Filter />
      {user && user.role === "owner" && (
        <div className="flex justify-end">
          <Link to="/product/create" className="btn btn-secondary">
            Tambah Produk
          </Link>
        </div>
      )}

      <h3 className="text-lg text-primary font-bold text-right my-3">
        Menampilkan {pagination.totalProduct} produk
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold text-center mt-5">
            Tidak ada produk yang sesuai dengan pencarian Anda.
          </h1>
        ) : (
          products.map((item) => (
            <Cart item={item} key={item._id} user={user} />
          ))
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default productView;
