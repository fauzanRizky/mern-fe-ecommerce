import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const cartView = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemsInCart === 0) {
    return (
      <>
        <h1 className="text-3xl text-center font-bold">
          Belum ada produk apapun di keranjanag Anda.
        </h1>
      </>
    );
  } else {
    return (
      <>
        <div className="border-primary mt-5">
          <h2 className="border-b text-2xl font-bold pb-5 capitalize">
            Daftar produk di keranjang Anda:
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <CartList />
            </div>
            <div className="lg:col-span-4 lg:pl-4">
              <CartTotal />
              {user ? (
                <Link to="/checkout" className="btn btn-primary btn-block mt-8">
                  Chekcout
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary btn-block mt-8">
                  Silahkan login untuk checkout!
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default cartView;
