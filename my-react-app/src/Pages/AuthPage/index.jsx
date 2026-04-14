import { useForm } from "react-hook-form";
import styles from "./authPage.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../Auth/authSlice";
import { session } from "../../Auth/session";

export default function AuthPage() {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
        deviceId: session.getDeviceId(),
      }),
    );
  };

  return (
    <>
      <div className={styles.main}>
        <form className={styles.form1} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form1}>
            <label>Email</label>
            <br></br>
            <input
              className={styles.un}
              type="text"
              name="email"
              {...register("email")}
            />
          </div>
          <div>
            <label>Password</label>
            <br></br>
            <input
              className={styles.pass}
              type="password"
              name="password"
              {...register("password")}
            />
          </div>
          <div>
            <button className={styles.submit} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
