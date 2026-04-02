import { useEffect } from "react";
import DataGrid from "./form";
import { columnConfig } from "../../config/columnConfig";
import styles from "./form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, roleList, createRole } from "./roleSlice";

export default function RolePage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { roles, modal, loading, error } = useSelector((state) => state.role);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      dispatch(roleList(token));
    }
  }, [dispatch, token]);

  function openModalCreateRole() {
    dispatch(openModal({ type: "create" }));
  }

  function closeModalCreateRole() {
    dispatch(closeModal());
  }

  const createRoles = (data) => {
    dispatch(
      createRole({
        token: token,
        code: data.code,
        name: data.name,
        description: data.description,
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
          onClick={closeModalCreateRole}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div> Создать роль</div>
      </div>
      <div className={styles.modalСreateContent}></div>
      <form onSubmit={handleSubmit(createRoles)}>
        <div>Код:</div>
        <input type="text" {...register("code")}></input>
        <div>Название:</div>
        <input type="text" {...register("name")}></input>
        <div>Описание:</div>
        <input type="text" {...register("description")}></input>
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
            onClick={closeModalCreateRole}
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
        <div style={{ display: "flex", marginTop: 30 }}>
          <h2>Роли</h2>
          <button
            className={styles.buttonCreateRole}
            onClick={openModalCreateRole}
          >
            Создать роль
          </button>
        </div>
        <ModalWindow open={modal.type === "create"} className={styles.modal}>
          {modal.type === "create" && modalContent}
        </ModalWindow>
        <DataGrid data={roles} columnConfig={columnConfig}></DataGrid>
      </div>
    </>
  );
}
