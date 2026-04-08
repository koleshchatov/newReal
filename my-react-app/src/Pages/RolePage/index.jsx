import { useEffect } from "react";
import DataGrid from "../../сomponents/form/form.jsx";
import { columnConfig } from "../../config/columnConfig";
import styles from "../../сomponents/form/form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useDispatch, useSelector } from "react-redux";
import { openModalRole, roleList } from "./roleSlice";
import ModalCreateRole from "./modalRoleContent/createRole.jsx";
import ModalEditRole from "./modalRoleContent/editRole.jsx";
import ModalDeleteRole from "./modalRoleContent/deleteRole.jsx";

export default function RolePage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { roles, modal, loading, error } = useSelector((state) => state.role);

  useEffect(() => {
    if (token) {
      dispatch(roleList(token));
    }
  }, [dispatch, token]);

  function openModalCreateRole() {
    dispatch(openModalRole({ type: "createRole" }));
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
          type="roleActions"
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
