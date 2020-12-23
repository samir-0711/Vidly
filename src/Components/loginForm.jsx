import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

const LoginForm = () => {
  //   const username = React.createRef();

  const [state, setState] = useState({
    data: { username: "", password: "" },
    error: {},
  });

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(state.data, schema, option);
    console.log(error);
    const errors = {};

    if (!error) return null;
    for (const items of error.details) errors[items.path[0]] = items.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setState({ ...state, error: errors || {} });
    if (errors) return;
    doSubmit();
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const rules = { [name]: schema[name] };

    const { error } = Joi.validate(obj, rules);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget }) => {
    const error = { ...state.error };
    const errorMessage = validateProperty(currentTarget, schema);
    if (errorMessage) error[currentTarget.name] = errorMessage;
    else delete error[currentTarget.name];

    const data = { ...state.data };
    data[currentTarget.name] = currentTarget.value;
    setState({ ...state, data, error });
  };

  const doSubmit = () => {
    //call the server, save changes and redirect
    console.log("Submitted");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ padding: "20px 0 0 0" }}>
        <Input
          name="username"
          type="text"
          label="Username"
          value={state.data.username}
          onChange={handleChange}
          placeholder="A-Z, a-z, 0-9, symbols"
          error={state.error.username}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={state.data.password}
          onChange={handleChange}
          placeholder="password"
          error={state.error.password}
        />
        <div className="mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
        </div>
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
