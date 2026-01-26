import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../auth/AuthContext";

export default function authPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuthContext();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
