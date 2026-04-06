import DataGridUsers from "./form";
import { useEffect } from "react";
import { columnConfigUsers } from "../../config/columnConfigUsers";
import styles from "./form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, userList, createNewUser } from "./userSlice";

export default function personalPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { users, modal, loading, error } = useSelector((state) => state.user);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      dispatch(userList(token));
    }
  }, [dispatch, token]);

  function openModalCreateUser() {
    dispatch(openModal({ type: "create" }));
  }

  function closeModalCreateUser() {
    dispatch(closeModal());
  }

  const createUser = (data) => {
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
    );

    dispatch(closeModal());
  };

  const modalContent = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeModalCreateUser}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div> Создать роль</div>
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
            onClick={closeModalCreateUser}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div>
        <div>
          <h2>Пользователи</h2>
          <button
            className={styles.buttonCreateRole}
            onClick={openModalCreateUser}
          >
            Создать роль
          </button>
        </div>

        <ModalWindow open={modal.type === "create"} className={styles.modal}>
          {modal.type === "create" && modalContent}
        </ModalWindow>
        <DataGridUsers
          data={users}
          columnConfig={columnConfigUsers}
        ></DataGridUsers>
      </div>
    </>
  );
}
