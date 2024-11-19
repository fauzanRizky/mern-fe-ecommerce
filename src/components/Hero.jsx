import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { products } = useLoaderData();

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Datang di JoliShop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Di mana kalian bisa mencari kebutuhan stylist Anda. Segera browsing
            produk-produk di website ini untuk mendapatkan penawaran menarik!
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Produk Kami
            </Link>
          </div>
        </div>

        <div className="hidden lg:carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          {products.map((item) => (
            <div className="carousel-item" key={item._id}>
              <img src={item.image} className="rounded-box max-h-96" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
