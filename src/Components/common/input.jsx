import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        // autoFocus
        // ref={username}
        {...rest}
        name={name}
        className="form-control"
        id={name}
      />
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </div>
  );
};

export default Input;
