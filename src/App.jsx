import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

//Component
import AboutView from "./pages/aboutView";
import CartView from "./pages/cartView";
import HomeView from "./pages/homeView";
import OrderView from "./pages/orderView";
import ProductView from "./pages/productView";
import LoginView from "./pages/auth/loginView";
import RegisterView from "./pages/auth/registerView";
import PublicLayout from "./layouts/publicLayout";
import DetailProduct from "./pages/detailProduct";
import CheckOutView from "./pages/checkOutView";
import CreateProductView from "./pages/createProductView";
import EditProductView from "./pages/editProductView";

// Loader
import { loader as HomeLoader } from "./pages/homeView";
import { loader as ProductLoader } from "./pages/productView";
import { loader as CheckoutLoader } from "./pages/checkOutView";
import { loader as OrderLoader } from "./pages/orderView";
import { loader as CreateProductViewLoader } from "./pages/createProductView";
import { loader as EditProductViewLoader } from "./pages/editProductView";

//Action
import { action as LoginAction } from "./pages/auth/loginView";
import { action as RegisterAction } from "./pages/auth/registerView";

//Storage
import { store } from "./store";

//Error compomnent
import ErrorView from "./pages/errorView";
import Order from "../../server/models/orderModel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: "products",
        element: <ProductView />,
        loader: ProductLoader,
      },
      {
        path: "product/create",
        element: <CreateProductView />,
        loader: CreateProductViewLoader(store),
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: "product/:id/edit",
        element: <EditProductView />,
        loader: EditProductViewLoader(store),
      },
      {
        path: "orders",
        element: <OrderView />,
        loader: OrderLoader(store),
      },
      {
        path: "checkout",
        element: <CheckOutView />,
        loader: CheckoutLoader(store),
      },
      {
        path: "carts",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction(store),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
