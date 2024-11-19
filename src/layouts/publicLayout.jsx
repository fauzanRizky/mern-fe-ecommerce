import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Loading from "../components/Loading";

const publicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Nav />
      {isPageLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-6xl px-8 py-20 ">
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
};

export default publicLayout;
