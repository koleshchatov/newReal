import { useEffect, useState } from "react";
import { createNewRole, role } from "../../servises/role.service";
import DataGrid from "../form";
import { columnConfig } from "../columnConfig";
import styles from "../form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function RolePage() {
  const { isLoadingAuth, error, authentication, token } = useSelector(
    (state) => state.auth,
  );
  const [roles, setRoles] = useState();
  const [modal, setModal] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function roleList() {
      const rolelist = await role(token);
      setRoles(rolelist.items);
    }

    roleList();
  }, []);

  function openModalCreateRole() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  const createRole = (data) => {
    createNewRole({
      token: token,
      code: data.code,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });

    setModal(false);
  };

  const modalContent = (
    <div>
      <div style={{ display: "flex" }}>
        <button type="button" onClick={closeModal} className={styles.closeBtn}>
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
        <input type="text" {...register("isActive")}></input>

        <div>
          <button className={styles.buttonCreateModal} type="submit">
            Создать
          </button>
          <button
            className={styles.buttonExitCreateModal}
            type="button"
            onClick={closeModal}
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
