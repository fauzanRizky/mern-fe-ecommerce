import FormAuth from "../../components/FormAuth";
import customAPI from "../../api";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { loginUser } from "../../features/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/login", data);

      console.log(response);
      store.dispatch(loginUser(response.data));
      toast.success("Login berhasil!");

      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      console.log(errorMessage);
      toast.error(errorMessage);
      return null;
    }
  };

const loginView = () => {
  return (
    <main>
      <FormAuth />
    </main>
  );
};

export default loginView;
