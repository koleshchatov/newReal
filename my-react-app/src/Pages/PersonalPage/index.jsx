import { useEffect, useState } from "react";
import { columnConfig } from "../../config/columnConfig";
import styles from "../../сomponents/form/form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  openModalUser,
  closeModalUser,
  userList,
  createNewUser,
} from "./userSlice";
import DataGrid from "../../сomponents/form/form.jsx";

export default function personalPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { users, modal, loading, error } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (token) {
      dispatch(userList(token));
    }
  }, [dispatch, token]);

  function openModalCreateUser() {
    dispatch(openModalUser({ type: "create" }));
  }

  function closeModalCreateUser() {
    dispatch(closeModalUser());
  }

  const menuItem = {
    display: "block",
    width: "100%",
    background: "white",
    zIndex: 1000,
    paddingBottom: "10px",
    cursor: "pointer",
  };

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

    dispatch(closeModalUser());
  };

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }

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
            onClick={closeModalCreateUser}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );

  const modalShowUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Профиль пользователя</div>
      </div>
    </div>
  );

  const modalEditUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Редактировать профиль</div>
      </div>
    </div>
  );

  const modalEditRoleUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Сменить роль</div>
      </div>
    </div>
  );

  const modalEditPositionUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Сменить должность</div>
      </div>
    </div>
  );

  const modalEditPasswordUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Сменить пароль</div>
      </div>
    </div>
  );

  const modalUnBlockUserPost = (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Разблокировать пользователя?</div>
      </div>
    </div>
  );

  function getUserActions(row) {
    return (
      <td>
        <button className={styles.buttonEdit} onClick={() => setOpen(!open)}>
          <span>Действия</span>
        </button>
        {open && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              zIndex: 1000,
              background: "fff",
              minWidth: "250px",
            }}
          >
            <ul>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(openModalUser({ type: "showUser", data: row }))
                }
              >
                Посмотреть
              </li>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(openModalUser({ type: "editUser", data: row }))
                }
              >
                Редактировать профиль
              </li>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(openModalUser({ type: "editRoleUser", data: row }))
                }
              >
                Сменить роль
              </li>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPositionUser", data: row }),
                  )
                }
              >
                Сменить должность
              </li>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPasswordUser", data: row }),
                  )
                }
              >
                Сменить пароль
              </li>
              <li
                style={{ ...menuItem }}
                onClick={() =>
                  dispatch(openModalUser({ type: "unBlockUser", data: row }))
                }
              >
                Разблокировать
              </li>
            </ul>
          </div>
        )}
      </td>
    );
  }

  return (
    <>
      <div>
        <div>
          <h2>Пользователи</h2>
          <button
            className={styles.buttonCreateRole}
            onClick={openModalCreateUser}
          >
            Создать пользователя
          </button>
        </div>

        <DataGrid
          data={users}
          columnConfig={columnConfig}
          getActions={getUserActions}
        ></DataGrid>
        <ModalWindow open={modal.type === "create"} className={styles.modal}>
          {modal.type === "create" && modalContent}
        </ModalWindow>
        <ModalWindow className={styles.modal} open={modal.type === "showUser"}>
          {modal.type === "showUser" && modal.data && modalShowUserPost}
        </ModalWindow>
        <ModalWindow className={styles.modal} open={modal.type === "editUser"}>
          {modal.type === "editUser" && modal.data && modalEditUserPost}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editRoleUser"}
        >
          {modal.type === "editRoleUser" && modal.data && modalEditRoleUserPost}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editPositionUser"}
        >
          {modal.type === "editPositionUser" &&
            modal.data &&
            modalEditPositionUserPost}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editPasswordUser"}
        >
          {modal.type === "editPasswordUser" &&
            modal.data &&
            modalEditPasswordUserPost}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "unBlockUser"}
        >
          {modal.type === "unBlockUser" && modal.data && modalUnBlockUserPost}
        </ModalWindow>
      </div>
    </>
  );
}
