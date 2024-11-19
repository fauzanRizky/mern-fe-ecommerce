import React from "react";

export const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
        placeholder={
          label !== "Search Product"
            ? name === "email"
              ? "Ketik alamat email Anda"
              : name === "password"
              ? "Ketik password Anda"
              : name === "name"
              ? "Ketik nama Anda"
              : ""
            : "Ketik nama produk"
        }
      />
    </label>
  );
};

export default FormInput;
