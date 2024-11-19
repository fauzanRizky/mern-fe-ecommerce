import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { priceFormat } from "../utils";
import customAPI from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan login untuk mengakses halaman ini!");
    return redirect("/login");
  }

  let orders;

  if (user.role === "owner") {
    const { data } = await customAPI.get("/order");

    // orders = data.data;
    orders = Array.isArray(data?.data) ? data.data : [data.data];
  } else {
    const { data } = await customAPI.get("/order/current/user");

    // orders = data.data;
    orders = Array.isArray(data?.data) ? data.data : [data.data];
  }

  console.log(user.role);

  return { orders };
};

const orderView = () => {
  const { orders } = useLoaderData();
  if (!orders.length) {
    return (
      <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary">
        Anda belum memiliki pesanan apapun.
      </h1>
    );
  }
  {
    return (
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>No.</th>
              <td>Order by</td>
              <td>Product</td>
              <td>Total</td>
              <td>Status Pembayaran</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>
                  <ul className="list-desc">
                    {item.itemsDetail.map((productItem) => (
                      <li key={productItem.product}>
                        {productItem.name} <br />
                        <span className="font-bold">
                          Jumlah {productItem.quantity} produk
                        </span>{" "}
                        <br />
                        {priceFormat(productItem.price)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{priceFormat(item.total)}</td>
                <td>
                  {item.status === "pending" ? (
                    <span className="btn btn-info">Pending</span>
                  ) : item.status === "success" ? (
                    <span className="btn btn-success">Success</span>
                  ) : (
                    <span className="btn btn-error">Error</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default orderView;
