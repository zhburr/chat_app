import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./register.scss";
import { RegisterForm } from "../../utils/interfaces/registerForm.type";
import {
  validateRequired,
  validatePasswordMatch,
  validateLength,
} from "../../utils/service/validation.service";
import { Toast } from "../../utils/enums/toast.enum";
import { Toaster } from "../../utils/service/shared.service";
function Register() {
  const [values, setValues] = useState<RegisterForm>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      await validateRequired(
        [
          ["userName", "User name"],
          ["email", "Email"],
          ["password", "Password"],
          ["confirmPassword", "Confirm password"],
        ],
        values
      );

      await validateLength([["userName", "User name"]], values, 4);
      await validatePasswordMatch(values.password, values.confirmPassword);
    } catch (error: any) {
      Toaster(error.message ?? Toast.NO_RESOURCE, Toast.DANGER);
    }
  }

  function handleChange(event: any) {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <div className="main">
      <form className="form" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={logo} alt="Logo" />
          <h1>snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          onChange={(event) => handleChange(event)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => handleChange(event)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Create user</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
