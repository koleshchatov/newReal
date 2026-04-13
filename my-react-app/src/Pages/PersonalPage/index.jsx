import { useEffect, useState } from "react";
import { columnConfig } from "../../Config/columnConfig.jsx";
import styles from "../../Components/Form/form.module.css";
import ModalWindow from "../../Components/ModalWindow/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModalUser, userList } from "./userSlice.jsx";
import DataGrid from "../../Components/Form/form.jsx";
import ModalCreateUserPost from "./ModalUserContent/createUser.jsx";
import ModalShowUserPost from "./ModalUserContent/showUser.jsx";
import ModalEditUserPost from "./ModalUserContent/editUser.jsx";
import ModalEditRoleUserPost from "./ModalUserContent/editRoleUser.jsx";
import ModalEditPositionUserPost from "./ModalUserContent/editPositionUser.jsx";
import ModalEditPasswordUserPost from "./ModalUserContent/editPasswordUser.jsx";
import ModalUnBlockUserPost from "./ModalUserContent/unBlockUser.jsx";

export default function PersonalPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { users, modal } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(userList(token));
    }
  }, [dispatch, token]);

  function openModalCreateUser() {
    dispatch(openModalUser({ type: "create" }));
  }

  function getUserActions(row) {
    return (
      <>
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
                className={styles.menuItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "showUser", data: row }))
                }
              >
                Посмотреть
              </li>
              <li
                className={styles.menuItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "editUser", data: row }))
                }
              >
                Редактировать профиль
              </li>
              <li
                className={styles.menuItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "editRoleUser", data: row }))
                }
              >
                Сменить роль
              </li>
              <li
                className={styles.menuItem}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPositionUser", data: row }),
                  )
                }
              >
                Сменить должность
              </li>
              <li
                className={styles.menuItem}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPasswordUser", data: row }),
                  )
                }
              >
                Сменить пароль
              </li>
              <li
                className={styles.menuItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "unBlockUser", data: row }))
                }
              >
                Разблокировать
              </li>
            </ul>
          </div>
        )}
      </>
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
          {modal.type === "create" && <ModalCreateUserPost />}
        </ModalWindow>
        <ModalWindow className={styles.modal} open={modal.type === "showUser"}>
          {modal.type === "showUser" && modal.data && <ModalShowUserPost />}
        </ModalWindow>
        <ModalWindow className={styles.modal} open={modal.type === "editUser"}>
          {modal.type === "editUser" && modal.data && <ModalEditUserPost />}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editRoleUser"}
        >
          {modal.type === "editRoleUser" && modal.data && (
            <ModalEditRoleUserPost />
          )}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editPositionUser"}
        >
          {modal.type === "editPositionUser" && modal.data && (
            <ModalEditPositionUserPost />
          )}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "editPasswordUser"}
        >
          {modal.type === "editPasswordUser" && modal.data && (
            <ModalEditPasswordUserPost />
          )}
        </ModalWindow>
        <ModalWindow
          className={styles.modal}
          open={modal.type === "unBlockUser"}
        >
          {modal.type === "unBlockUser" && modal.data && (
            <ModalUnBlockUserPost />
          )}
        </ModalWindow>
      </div>
    </>
  );
}
