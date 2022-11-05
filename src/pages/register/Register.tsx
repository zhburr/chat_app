import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./styles.scss";
import { RegisterForm } from "../../utils/interfaces/registerForm.type";
import {
  validateRequired,
  validatePasswordMatch,
  validateLength,
} from "../../utils/service/validation.service";
import { Toast } from "../../utils/enums/toast.enum";
import { Toaster } from "../../utils/service/shared.service";
import axios from "axios";
import { ApiRoutes } from "../../utils/ApiRoutes";
function Register() {
  const [values, setValues] = useState<RegisterForm>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

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

      await validateLength([["userName", "User name"]], values, 3);
      await validatePasswordMatch(values?.password!, values?.confirmPassword!);

      const _data: RegisterForm = {
        userName: values.userName,
        email: values.email,
        password: values.password,
      };

      const { data }: any = await axios.post(ApiRoutes.registerRoute, _data);
      console.log(data);
      if (!data.Succeed) {
        Toaster(data.message ?? Toast.NO_RESOURCE, Toast.DANGER);
      } else {
        Toaster("User successfully created", Toast.SUCCESS);
        localStorage.setItem("user", JSON.stringify(data.Content));
        navigate("/");
      }
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
