import { useEffect, useState } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";
import Loading from "../components/Loading";
import FormTextArea from "../components/Form/FormTextArea";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan login terlebih dahulu!");
    return redirect("/login");
  } else if (user.role != "owner") {
    toast.warn("Anda tidak diizinkan untuk mengakses halaman ini!");
    return redirect("/");
  }
};

const editProductView = () => {
  const kategori = ["sepatu", "baju", "jaket", "celana"];
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
    console.log(data.data);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      // const responseFileUpload = await customAPI.post(
      //   "/product/file-upload",
      //   {
      //     image: data.image,
      //   },
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );

      // console.log("Response Image", responseFileUpload.data.url);

      //Buat produk
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        // image: responseFileUpload.data.url,
      });

      toast.info("Berhasil update data produk!");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      {product ? (
        <div>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            {/* <label className="form-control">
              <label className="label">
                <span className="label-text capitalize">Image</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              />
            </label> */}
            <FormSelect
              name="category"
              label="Pilih Kategori"
              list={kategori}
              defaultValue={product.category}
            />
            <FormInput
              name="name"
              label="Nama produk"
              type="text"
              defaultValue={product.name}
            />
            <FormInput
              name="price"
              label="Harga produk"
              type="number"
              defaultValue={product.price}
            />
            <FormInput
              name="stock"
              label="Stok produk"
              type="number"
              defaultValue={product.stock}
            />
            <FormTextArea
              name="description"
              label="Deskripsi produk"
              defaultValue={product.description}
            />
            <input
              type="submit"
              value="Edit Produk"
              className="btn btn-block mt-5 btn-md"
            />
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default editProductView;
