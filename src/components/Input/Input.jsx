import React from "react";
import css from "./Input.module.scss";

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  readOnly,
}) => {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <input
        type={type || "text"}
        className={`form-control ${value ? "" : "is-invalid"}`}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
      />
      {/* {console.log(error)} */}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
