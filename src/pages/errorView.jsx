import React from "react";
import { Link, useRouteError } from "react-router-dom";

const errorView = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="mt-6 text-lg leading-7">
            Mohon maaf halaman yang Anda maksud tidak ditemukan...
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-primary">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </main>
    );
  } else if (error.status === 500) {
    //Server down
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">500</h1>
          <p className="mt-6 text-lg leading-7">
            Mohon maaf saat ini server sedang dalam perbaikan. Silahkan kembali
            beberapa saat lagi...
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-primary">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
};

export default errorView;
