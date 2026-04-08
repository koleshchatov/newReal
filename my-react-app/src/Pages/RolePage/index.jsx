import { useEffect } from "react";
import DataGrid from "../../сomponents/form/form.jsx";
import { columnConfig } from "../../config/columnConfig";
import styles from "../../сomponents/form/form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalRole,
  roleList,
  createRole,
  deleteRolePost,
  editRolePost,
} from "./roleSlice";

export default function RolePage() {
  const dispatch = useDispatch();
  const { reset, register, handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { roles, modal, loading, error } = useSelector((state) => state.role);

  useEffect(() => {
    if (token) {
      dispatch(roleList(token));
    }
  }, [dispatch, token]);

  function openModalCreateRole() {
    dispatch(openModal({ type: "createRole" }));
  }

  function closeModalCreateRole() {
    dispatch(closeModalRole());
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

    dispatch(closeModalRole());
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

  const deletePost = () => {
    dispatch(deleteRolePost({ token: token, code: modal.data.code }));

    dispatch(closeModalRole());
  };

  const upDateRole = (data) => {
    dispatch(
      editRolePost({
        token: token,
        code: modal.data.code,
        name: data.name,
        description: data.description,
        isActive: data.isActive === "true",
      }),
    );
    reset();
    dispatch(closeModalRole());
  };

  function closeAllModal() {
    reset();
    dispatch(closeModalRole());
  }

  const modalEditPost = (
    <div>
      <form onSubmit={handleSubmit(upDateRole)}>
        {modal.data && (
          <>
            <div style={{ display: "flex" }}>
              Вы редактируете роль с кодом
              <div className={styles.roleCode}>{modal.data?.code}</div>
            </div>
            <div className={styles.modalСreateContent}>
              <div>Название</div>
              <input
                type="text"
                defaultValue={modal.data.name}
                {...register("name")}
              ></input>
              <div>Описание</div>
              <input
                type="text"
                defaultValue={modal.data.description}
                {...register("description")}
              ></input>
              <div>Активна</div>
              <div style={{ display: "flex" }}>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="true"
                    defaultChecked={modal.data.isActive === true}
                    {...register("isActive")}
                  ></input>
                  Активна
                </label>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="false"
                    defaultChecked={modal.data.isActive === false}
                    {...register("isActive")}
                  ></input>
                  Не активна
                </label>
              </div>
            </div>
            <div>
              <button className={styles.buttonCreateModal} type="submit">
                Обновить
              </button>
              <button
                className={styles.buttonExitCreateModal}
                type="button"
                onClick={closeAllModal}
              >
                Отмена
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );

  const modaldeletePost = (
    <div>
      <div style={{ display: "flex", marginLeft: 20, fontSize: 22 }}>
        Вы точно хотите удалить роль
        <div style={{ marginLeft: 7, color: "red" }}>{modal.data?.code}</div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button
          type="button"
          className={styles.buttonModalExit}
          onClick={closeAllModal}
        >
          отмена
        </button>
        <button className={styles.buttonModalDelete} onClick={deletePost}>
          удалить
        </button>
      </div>
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

        <DataGrid
          data={roles}
          columnConfig={columnConfig}
          type="roleActions"
        ></DataGrid>

        <ModalWindow className={styles.modal} open={modal.type === "editRole"}>
          {modal.type === "editRole" && modal.data && modalEditPost}
        </ModalWindow>

        <ModalWindow
          className={styles.modalDelete}
          open={modal.type === "deleteRole"}
        >
          {modal.type === "deleteRole" && modal.data && modaldeletePost}
        </ModalWindow>

        <ModalWindow
          open={modal.type === "createRole"}
          className={styles.modal}
        >
          {modal.type === "createRole" && modalContent}
        </ModalWindow>
      </div>
    </>
  );
}
