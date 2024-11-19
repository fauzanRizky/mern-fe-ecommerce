import React from "react";

export const FormTextArea = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-36"
        name={name}
        defaultValue={defaultValue}
        placeholder="Deskripsi"
      ></textarea>
    </label>
  );
};

export default FormTextArea;
