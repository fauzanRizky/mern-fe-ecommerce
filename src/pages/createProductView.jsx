import FormTextArea from "../components/Form/FormTextArea";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import CustomApi from "../api";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import customAPI from "../api";

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

const createProductView = () => {
  const kategori = ["sepatu", "baju", "jaket", "celana"];
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      const responseFileUpload = await customAPI.post(
        "/product/file-upload",
        {
          image: data.image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response Image", responseFileUpload.data.url);

      //Buat produk
      await customAPI.post("/product", {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        image: responseFileUpload.data.url,
      });

      toast.success("Berhasil tambah produk!");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }

    console.log(data);
  };
  return (
    <div>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <label className="form-control">
          <label className="label">
            <span className="label-text capitalize">Image</span>
          </label>
          <input
            type="file"
            name="image"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          />
        </label>
        <FormSelect name="category" label="Pilih Kategori" list={kategori} />
        <FormInput name="name" label="Nama produk" type="text" />
        <FormInput name="price" label="Harga produk" type="number" />
        <FormInput name="stock" label="Stok produk" type="number" />
        <FormTextArea name="description" label="Deskripsi produk" />
        <input
          type="submit"
          value="Tambah Produk"
          className="btn btn-block mt-5 btn-md"
        />
      </form>
    </div>
  );
};

export default createProductView;
