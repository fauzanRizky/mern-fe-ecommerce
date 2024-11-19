import React from "react";
import CartTotal from "../components/CartTotal";
// import { Form } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { useEffect } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";
import { clearCartItems } from "../features/cartSlice";
import { redirect, useNavigate } from "react-router-dom";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan login untuk mengakses halaman ini!");
    return redirect("/login");
  }
  return null;
};

const checkOutView = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.cartItems);
  // console.log(user, carts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const checkoutHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    console.log(data);

    const newCartArray = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });

    const newCartArrayMidtrans = carts.map((item) => {
      return {
        id: item.productId,
        quantity: item.amount,
      };
    });

    console.log(newCartArrayMidtrans);

    // const response = await customAPI.post("/order", {
    //   email: data.email,
    //   firstName: data.firstname,
    //   lastName: data.lastname,
    //   phone: data.phone,
    //   cartItem: newCartArray,
    // });

    // const responseMidtrans = {
    //   email: data.email,
    //   firstName: data.firstname,
    //   lastName: data.lastname,
    //   phone: data.phone,
    //   cartItem: newCartArrayMidtrans,
    // };

    // const snapToken = response.data.token;

    // console.log(snapToken);

    try {
      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        cartItem: newCartArray,
      });

      const snapToken = response.data.token;

      console.log(snapToken);

      if (snapToken.token) {
        window.snap.pay(snapToken.token, {
          onSuccess: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(result);
            dispatch(clearCartItems());
            navigate("/orders");
            // alert("Success");
          },
          onPending: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(result);
            alert("Pending");
          },
          onError: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(result);
            alert("Error");
          },
        });
      } else {
        console.error("Token Midtrans tidak ditemukan.");
        toast.error("Gagal mendapatkan token pembayaran.");
      }

      //   window.snap.pay(snapToken, {
      //     // Optional
      //     onSuccess: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Success");
      //     },
      //     // Optional
      //     onPending: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Pending");
      //     },
      //     // Optional
      //     onError: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Error");
      //     },
      //   });
      //   toast.success("Order Anda Berhasil Dilanjutkan!");

      // if (snapToken) {
      //   window.snap.pay(snapToken, {
      //     // Optional
      //     onSuccess: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Success");
      //     },
      //     // Optional
      //     onPending: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Pending");
      //     },
      //     // Optional
      //     onError: function (result) {
      //       /* You may add your own js here, this is just example */
      //       // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      //       console.log(result);
      //       alert("Error");
      //     },
      //   });
      //   toast.success("Order Anda Berhasil Dilanjutkan!");
      // } else {
      //   console.error("Token Midtrans tidak ditemukan.");
      //   toast.error("Gagal mendapatkan token pembayaran.");
      // }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <form
            method="POST"
            className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
            onSubmit={checkoutHandler}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="first name" type="name" name="firstname" />
              <FormInput label="last name" type="name" name="lastname" />
            </div>
            <FormInput
              label="email"
              type="email"
              name="email"
              defaultValue={user.email}
            />
            <FormInput label="phone" type="phone" name="phone" />
            <button type="submit" className="btn btn-primary mt-8">
              Bayar
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default checkOutView;
