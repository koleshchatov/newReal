import React from "react";
import { useForm } from "react-hook-form";

export default function authPage() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" ref={register} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" ref={register} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
