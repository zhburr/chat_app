import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../../utils/enums/toast.enum";
import { Toaster } from "../../utils/service/shared.service";
import { validateRequired } from "../../utils/service/validation.service";
import logo from "../../assets/logo.svg";
import { LoginForm } from "../../utils/interfaces/loginForm.type";
import "./styles.scss";
import axios from "axios";
import { ApiRoutes } from "../../utils/ApiRoutes";
function Login() {
  const [values, setValues] = useState<LoginForm>({
    userName: "",
    password: "",
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
          ["password", "Password"],
        ],
        values
      );
      const _data: LoginForm = {
        userName: values.userName,
        password: values.password,
      };
      const { data }: any = await axios.post(ApiRoutes.loginRoute, _data);
      console.log(data);
      if (!data.Succeed) {
        Toaster(data.message ?? Toast.NO_RESOURCE, Toast.DANGER);
      } else {
        Toaster("Sucessfully logged in", Toast.SUCCESS);
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
    <div className="login_main">
      <form className="login_form" onSubmit={(event) => handleSubmit(event)}>
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
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
