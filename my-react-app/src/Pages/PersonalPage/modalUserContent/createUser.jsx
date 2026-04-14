import styles from "../../../Components/Form/form.module.css";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalUser, createNewUser, userList } from "../userSlice";

export default function ModalCreateUserPost() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const createUser = (data) => {
    try {
      dispatch(
        createNewUser({
          token: token,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          roleId: data.roleId,
          positionId: data.positionId,
          password: data.password,
          isActive: data.isActive === "true",
        }),
      ).unwrap();
      dispatch(userList(token)).unwrap();

      dispatch(closeModalUser());
    } catch (error) {
      console.error(error);
    }
  };

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div> Создать пользователя</div>
      </div>
      <div className={styles.modalСreateContent}></div>
      <form onSubmit={handleSubmit(createUser)}>
        <div>email:</div>
        <input type="text" {...register("email")}></input>
        <div>firstName:</div>
        <input type="text" {...register("firstName")}></input>
        <div>lastName:</div>
        <input type="text" {...register("lastName")}></input>
        <div>middleName:</div>
        <input type="text" {...register("middleName")}></input>
        <div>roleId:</div>
        <input type="text" {...register("roleId")}></input>
        <div>positionId:</div>
        <input type="text" {...register("positionId")}></input>
        <div>password:</div>
        <input type="password" {...register("password")}></input>
        <div>Активна</div>
        <div style={{ display: "flex" }}>
          <label>
            <input
              type="radio"
              name="active"
              value="true"
              {...register("isActive")}
            ></input>
            Активна
          </label>
          <label>
            <input
              type="radio"
              name="active"
              value="false"
              {...register("isActive")}
            ></input>
            Не активна
          </label>
        </div>

        <div>
          <button className={styles.buttonCreateModal} type="submit">
            Создать
          </button>
          <button
            className={styles.buttonExitCreateModal}
            type="button"
            onClick={closeAllModal}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
