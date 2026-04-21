import { useEffect } from "react";
import DataGrid from "../../Components/Form/form.jsx";
import { columnConfig } from "../../config/columnConfig.jsx";
import styles from "../../Components/Form/form.module.css";
import ModalWindow from "../../Components/ModalWindow/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModalRole, roleList } from "./roleSlice.jsx";
import ModalCreateRole from "./modalRoleContent/createRole.jsx";
import ModalEditRole from "./modalRoleContent/editRole.jsx";
import ModalDeleteRole from "./modalRoleContent/deleteRole.jsx";

export default function RolePage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { roles, modal } = useSelector((state) => state.role);

  useEffect(() => {
    if (token) {
      const rolesList = async () => {
        try {
          await dispatch(roleList(token)).unwrap();
        } catch (error) {
          console.error(error);
        }
      };
      rolesList();
    }
  }, [dispatch, token]);

  function openModalCreateRole() {
    dispatch(openModalRole({ type: "createRole" }));
  }

  function getRoleActions(row) {
    return (
      <>
        <button
          className={styles.buttonEdit}
          onClick={() =>
            dispatch(openModalRole({ type: "editRole", data: row }))
          }
        >
          <span>Редактировать</span>
        </button>
        <button
          className={styles.buttonDelete}
          onClick={() =>
            dispatch(openModalRole({ type: "deleteRole", data: row }))
          }
        >
          <span>Удалить</span>
        </button>
      </>
    );
  }

  return (
    <>
      <div>
        <div>
          <h2>Роли</h2>
          <button className={styles.buttonCreate} onClick={openModalCreateRole}>
            Создать роль
          </button>
        </div>

        <DataGrid
          data={roles}
          columnConfig={columnConfig}
          getActions={getRoleActions}
        ></DataGrid>

        <ModalWindow className={styles.modal} open={modal.type === "editRole"}>
          {modal.type === "editRole" && modal.data && <ModalEditRole />}
        </ModalWindow>

        <ModalWindow
          className={styles.modalDelete}
          open={modal.type === "deleteRole"}
        >
          {modal.type === "deleteRole" && modal.data && <ModalDeleteRole />}
        </ModalWindow>

        <ModalWindow
          open={modal.type === "createRole"}
          className={styles.modal}
        >
          {modal.type === "createRole" && <ModalCreateRole />}
        </ModalWindow>
      </div>
    </>
  );
}
