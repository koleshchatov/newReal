import { useState } from "react";
import { deleteRole, editRole } from "../servises/role.service";
import ModalWindow from "../сomponents/modalWindow/modal";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function DataGrid({ data, columnConfig = {} }) {
  const { isLoadingAuth, error, authentication, token } = useSelector(
    (state) => state.auth,
  );
  const { register, handleSubmit } = useForm();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [roleCode, setRoleCode] = useState();
<<<<<<< HEAD
=======

  
>>>>>>> d894da7f2d3b55b1de0db2d3b8c5d4480986417c

  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  const columns = Object.keys(data[0]);

  function deletePost() {
    deleteRole({ token: token, code: roleCode });
    setRoleCode()
    setModalDelete(false);
  }

  const upDateRole = (data) => {
    editRole({
      token: token,
      code: roleCode.code,
      name: data.name,
      description: data.description,
<<<<<<< HEAD
      isActive: Boolean(data.isActive),
=======
      isActive: Boolean(data.isActive)
>>>>>>> d894da7f2d3b55b1de0db2d3b8c5d4480986417c
    });
    setRoleCode();
    setModalEdit(false);
  };

  const modalEditPost = (
    <div>
      <form onSubmit={handleSubmit(upDateRole)}>
        {roleCode && (
          <>
            <div style={{ display: "flex" }}>
              Вы редактируете роль с кодом
              <div className={styles.roleCode}>"{roleCode.code}"</div>
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
                defaultValue={roleCode.description ? roleCode.description : ""}
                {...register("description")}
              ></input>
              <div>Активна</div>
              <div style={{ display: "flex" }}>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="true"
<<<<<<< HEAD
=======
                    
>>>>>>> d894da7f2d3b55b1de0db2d3b8c5d4480986417c
                    {...register("isActive")}
                  ></input>
                  Активна
                </label>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value=""
<<<<<<< HEAD
=======
                    
>>>>>>> d894da7f2d3b55b1de0db2d3b8c5d4480986417c
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
                type="reset"
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
<<<<<<< HEAD
        <div style={{ marginLeft: 7, color: "red" }}>{roleCode}</div>
=======
        <div style={{ marginLeft: 7, color: "red" }}>"{roleCode}"</div>
>>>>>>> d894da7f2d3b55b1de0db2d3b8c5d4480986417c
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

  function modalOpenDeletePost(data) {
    setRoleCode(data);
    setModalDelete(true);
  }

  function modalOpenEditPost(data) {
    setRoleCode(data);
    setModalEdit(true);
  }

  

  function closeModalDelete() {
    setRoleCode()
    setModalDelete(false);
  }
  function closeModalEdit() {
    setRoleCode()
    setModalEdit(false);
  }

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
                  onClick={() => modalOpenDeletePost(row.code)}
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
