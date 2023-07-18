import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import image from "../../imgs/LogoBQ.png";
import { loginAdmin } from "../../services/Login.services";

function Auth() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigateTo = useNavigate();

  const onSubmit = useCallback((data) => {
    loginAdmin(data)
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(await response.json());
      })
      .then((data) => {
        if (data.user.role === "admin") {
          navigateTo("/admin");
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userRole", data.user.role);
          localStorage.setItem("userId", data.user.id);
        } else if (data.user.role === "waiter") {
          navigateTo("/menu");
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userRole", data.user.role);
          localStorage.setItem("userId", data.user.id);
        } else if (data.user.role === "chef") {
          navigateTo("/chef");
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userRole", data.user.role);
          localStorage.setItem("userId", data.user.id);
        }
      })
      .catch((error) => {
        if (error.message === "Cannot find user") {
          error.message = "Usuario no existe";
        } else if (error.message === "Incorrect password") {
          error.message = "Contraseña incorrecta";
        } else {
          error.message = "Datos incorrectos";
        }
        setErrorMessage(error.message);
        reset();
      });
  }, [navigateTo, reset]);

  return (
    <section data-testid="loginContainer" id="loginContainer">
      <section id="logoLogin">
        <img src={image} className="login-logo" alt="Burger Queen Logo" />
      </section>
      <section id="loginForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="label-input">
            <label className="loginLabel">Email</label>
            <input
              type="text"
              placeholder="ejemplo@ejemplo.com"
              {...register("email", {
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
          </div>
          <div className="label-input">
            <label className="loginLabel" htmlFor="passwordInput">
              Contraseña
            </label>
            <input
              id="passwordInput"
              type="password"
              placeholder="*********"
              {...register("password")}
            />
          </div>
          <div className="spanError">
            <span className="errorMessage">
              {errors.email?.type === "required" && (
                <p>El correo es requerido</p>
              )}
              {errors.email?.type === "pattern" && (
                <p>El formato del email es incorrecto</p>
              )}
              {errors.password?.type === "required" && (
                <p>La contraseña es requerida</p>
              )}
              {errorMessage ? (
                <div className="error-message">{errorMessage}</div>
              ) : (
                ""
              )}
            </span>
          </div>
          <button type="submit" className="btnLogin" data-testid="login-button">
            INICIAR SESION
          </button>
        </form>
      </section>
    </section>
  );
}

export default Auth;