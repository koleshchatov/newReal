import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../auth/AuthContext";
import { loginUser } from "../../servises/auth.service";
import { v4 } from "uuid";
import styles from "./authPage.module.css";

export default function authPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuthContext();

  const onSubmit = (data) => {
    const localDeviceId = localStorage.getItem("deviceId");
    if (!localDeviceId) {
      localStorage.setItem("deviceId", v4());
    }
    login({
      email: data.email,
      password: data.password,
      deviceId: localStorage.deviceId,
    });
  };

  return (
    <>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <br></br>
          <input type="text" name="email" {...register("email")} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <br></br>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
