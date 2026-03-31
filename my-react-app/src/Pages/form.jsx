import { useEffect, useState } from "react";
import { deleteRole, editRole } from "../servises/role.service";
import ModalWindow from "../сomponents/modalWindow/modal";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function DataGrid({ data, columnConfig = {} }) {
  const { isLoadingAuth, error, authentication, token } = useSelector(
    (state) => state.auth,
  );
  const { reset, register, handleSubmit } = useForm();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [roleCode, setRoleCode] = useState();

  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  const columns = Object.keys(data[0]);

  function deletePost() {
    deleteRole({ token: token, code: roleCode.code });
    setRoleCode();
    setModalDelete(false);
  }

  const upDateRole = (data) => {
    editRole({
      token: token,
      code: roleCode.code,
      name: data.name,
      description: data.description,
      isActive: data.isActive === "true",
    });
    reset();
    setRoleCode();
    setModalEdit(false);
  };

  function modalOpenDeletePost(data) {
    setRoleCode(data);
    setModalDelete(true);
  }

  function modalOpenEditPost(data) {
    setRoleCode(data);
    console.log(data);
    setModalEdit(true);
  }

  function closeModalDelete() {
    reset();
    setRoleCode();
    setModalDelete(false);
  }
  function closeModalEdit() {
    reset();
    setRoleCode();
    setModalEdit(false);
  }

  const modalEditPost = (
    <div>
      <form onSubmit={handleSubmit(upDateRole)}>
        {roleCode && (
          <>
            <div style={{ display: "flex" }}>
              Вы редактируете роль с кодом
              <div className={styles.roleCode}>{roleCode?.code}</div>
            </div>
            <div className={styles.modalСreateContent}>
              <div>Название</div>
              <input
                type="text"
                defaultValue={roleCode.name}
                {...register("name")}
              ></input>
              <div>Описание</div>
              <input
                type="text"
                defaultValue={roleCode.description}
                {...register("description")}
              ></input>
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
            </div>
            <div>
              <button className={styles.buttonCreateModal} type="submit">
                Обновить
              </button>
              <button
                className={styles.buttonExitCreateModal}
                type="button"
                onClick={closeModalEdit}
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
        <div style={{ marginLeft: 7, color: "red" }}>{roleCode?.code}</div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button
          type="button"
          className={styles.buttonModalExit}
          onClick={closeModalDelete}
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
      <table className={styles.grid}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className={columnConfig[col]?.headerClass}>
                {col}
              </th>
            ))}
            <th>
              <div>Действия</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col} className={columnConfig[col]?.cellClass}>
                  {row[col]}
                </td>
              ))}

              <td>
                <button
                  className={styles.buttonEdit}
                  onClick={() => modalOpenEditPost(row)}
                >
                  <span>Редактировать</span>
                </button>
                <button
                  className={styles.buttonDelete}
                  onClick={() => modalOpenDeletePost(row)}
                >
                  <span>Удалить</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalWindow className={styles.modal} open={modalEdit}>
        {modalEditPost}
      </ModalWindow>

      <ModalWindow className={styles.modalDelete} open={modalDelete}>
        {modaldeletePost}
      </ModalWindow>
    </>
  );
}
