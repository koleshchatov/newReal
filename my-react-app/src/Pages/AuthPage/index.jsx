import { useForm } from "react-hook-form";
import styles from "./authPage.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../auth/authSlice";
import { session } from "../../auth/session";

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
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <form className={styles.form1} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className={styles.labelStroke}>Email:</label>

              <input
                className={styles.un}
                type="text"
                name="email"
                {...register("email")}
              />
            </div>
            <div>
              <label className={styles.labelStroke}>Password:</label>

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
      </div>
    </>
  );
}
