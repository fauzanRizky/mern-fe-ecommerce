import FormAuth from "../../components/FormAuth";
import { toast } from "react-toastify";
import customAPI from "../../api";
import { registerUser } from "../../features/userSlice";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    console.log(store);
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);
    console.log(data);

    try {
      const response = await customAPI.post("/auth/register", data);

      // console.log(response);
      store.dispatch(registerUser(response.data));
      toast.success("Login berhasil!");

      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      console.log(errorMessage);
      toast.error(errorMessage);
      return null;
    }
  };

const registerView = () => {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  );
};

export default registerView;
