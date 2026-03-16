import { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import { deleteRole, editRole } from "../servises/role.service";
import ModalWindow from "../сomponents/modalWindow/modal";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";

export default function DataGrid({ data, columnConfig = {} }) {
  const { token } = useAuthContext();
  const { register, handleSubmit } = useForm();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [roleCode, setRoleCode] = useState();

  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  const columns = Object.keys(data[0]);

  function deletePost() {
    deleteRole({ token: token, code: roleCode });
    setModalDelete(false);
  }

  const upDateRole = (data) => {
    editRole({
      token: token,
      code: roleCode,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });
    setModalEdit(false);
  };

  const modalEditPost = (
    <div>
      <form>
        <div>Вы редактируете роль с кодом {roleCode}</div>
        <br></br>

        <div>Название</div>
        <input type="text" {...register("name")}></input>
        <div>Описание</div>
        <input type="text" {...register("description")}></input>
        <div>Активна</div>
        <input type="text" {...register("isActive")}></input>

        <div>
          <button onClick={exitModalEdit}>Отмена</button>
          <button onClick={handleSubmit(upDateRole)}>Обновить</button>
        </div>
      </form>
    </div>
  );

  const modaldeletePost = (
    <div>
      <div>вы точно хотите удалить роль {roleCode}</div>
      <div>
        <button onClick={exitModalDelete}>отмена</button>
        <button onClick={deletePost}>да</button>
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
  function exitModalDelete() {
    setModalDelete(false);
  }
  function exitModalEdit() {
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
                  onClick={() => modalOpenEditPost(row.code)}
                >
                  <span>Редактировать</span>
                </button>
                <button
                  className={styles.buttonDelete}
                  onClick={() => {
                    modalOpenDeletePost(row.code);
                  }}
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
