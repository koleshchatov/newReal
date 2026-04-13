import { useEffect } from "react";
import DataGrid from "../../Components/Form/form.jsx";
import { columnConfig } from "../../Config/columnConfig.jsx";
import styles from "../../Components/Form/form.module.css";
import ModalWindow from "../../Components/ModalWindow/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModalRole, roleList } from "./roleSlice.jsx";
import ModalCreateRole from "./ModalRoleContent/createRole.jsx";
import ModalEditRole from "./ModalRoleContent/editRole.jsx";
import ModalDeleteRole from "./ModalRoleContent/deleteRole.jsx";

export default function RolePage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { roles, modal } = useSelector((state) => state.role);

  useEffect(() => {
    if (token) {
      dispatch(roleList(token));
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
          getActions={getRoleActions}
        ></DataGrid>

        <ModalWindow className={styles.modal} open={modal.type}>
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
