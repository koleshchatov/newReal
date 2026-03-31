import { useEffect } from "react";
import { createNewRole } from "../../servises/role.service";
import DataGrid from "../form";
import { columnConfig } from "../columnConfig";
import styles from "../form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, roleList } from "./roleSlice";

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
    dispatch(openModal());
  }

  function closeModalCreateRole() {
    dispatch(closeModal());
  }

  const createRole = (data) => {
    createNewRole({
      token: token,
      code: data.code,
      name: data.name,
      description: data.description,
      isActive: Boolean(data.isActive),
    });

    setModal(false);
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
      <form onSubmit={handleSubmit(createRole)}>
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
              value=""
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
        <ModalWindow open={modal} className={styles.modal}>
          {modalContent}
        </ModalWindow>
        <DataGrid data={roles} columnConfig={columnConfig}></DataGrid>
      </div>
    </>
  );
}
