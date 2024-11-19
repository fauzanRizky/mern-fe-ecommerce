import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormInput } from "./Form/FormInput";
import { FormSelect } from "./Form/FormSelect.jsx";
import { useLoaderData } from "react-router-dom";

export const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = ["sepatu", "baju", "jaket", "celana"];
  const submit = useSubmit();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryParams = {};

    for (const [key, value] of formData.entries()) {
      if (value) queryParams[key] = value; // Hanya masukkan parameter jika ada nilai
    }

    submit(queryParams, { method: "get" });
  };

  return (
    <Form
      method="get"
      onSubmit={handleSubmit}
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput
        label="Search Product"
        type="search"
        name="name"
        defaultValue={name}
      />
      <FormSelect
        label="Select Category"
        name="category"
        defaultValue={category}
        list={categories}
      />
      <button type="submit" className="btn btn-primary">
        SEARCH
      </button>
      <Link to="/products" className="btn btn-accent">
        RESET
      </Link>
    </Form>
  );
};

export default Filter;
