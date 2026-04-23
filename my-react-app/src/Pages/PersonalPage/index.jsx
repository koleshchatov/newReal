import { useEffect, useState } from "react";
import { columnConfig } from "../../config/columnConfig.jsx";
import styles from "../../Components/Form/form.module.scss";
import ModalWindow from "../../Components/ModalWindow/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModalUser, userList } from "./userSlice.jsx";
import DataGrid from "../../Components/Form/form.jsx";
import ModalCreateUserPost from "./modalUserContent/createUser.jsx";
import ModalShowUserPost from "./modalUserContent/showUser.jsx";
import ModalEditUserPost from "./modalUserContent/editUser.jsx";
import ModalEditRoleUserPost from "./modalUserContent/editRoleUser.jsx";
import ModalEditPositionUserPost from "./modalUserContent/editPositionUser.jsx";
import ModalEditPasswordUserPost from "./modalUserContent/editPasswordUser.jsx";
import ModalUnBlockUserPost from "./modalUserContent/unBlockUser.jsx";

export default function PersonalPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { users, modal } = useSelector((state) => state.user);
  const [openRowId, setOpenRowId] = useState(null);

  useEffect(() => {
    if (token) {
      const usersList = async () => {
        try {
          await dispatch(userList(token)).unwrap();
        } catch (error) {
          console.error(error);
        }
      };
      usersList();
    }
  }, [dispatch, token]);

  function openModalCreateUser() {
    dispatch(openModalUser({ type: "create" }));
  }

  function getUserActions(row) {
    return (
      <>
        <div className={styles.buttonActionUserWrap}>
          <button
            className={styles.buttonActionUser}
            onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
          >
            <span>Действия</span>
          </button>
          {openRowId === row.id && (
            <div className={styles.buttonActionUserMenu}>
              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "showUser", data: row }))
                }
              >
                Посмотреть
              </button>

              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "editUser", data: row }))
                }
              >
                Редактировать профиль
              </button>

              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "editRoleUser", data: row }))
                }
              >
                Сменить роль
              </button>

              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPositionUser", data: row }),
                  )
                }
              >
                Сменить должность
              </button>

              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(
                    openModalUser({ type: "editPasswordUser", data: row }),
                  )
                }
              >
                Сменить пароль
              </button>

              <button
                className={styles.buttonActionUserItem}
                onClick={() =>
                  dispatch(openModalUser({ type: "unBlockUser", data: row }))
                }
              >
                Разблокировать
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Пользователи</h2>
        <button className={styles.buttonCreate} onClick={openModalCreateUser}>
          Создать пользователя
        </button>

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
