import ModalWindow from "../../сomponents/modalWindow/modal";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "./userSlice";
import { useState } from "react";
import RowActions from "./rowActions";

export default function DataGridUsers({ data, columnConfig = {} }) {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { reset, register, handleSubmit } = useForm();

  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  const columns = Object.keys(data[0]);

  function renderCellValue(value, col) {
    if (value === null || value === undefined) return "";
    if (col === "role") return value?.name || "";
    if (col === "position") return value?.name || "";
    if (typeof value === "boolean") return value ? "Да" : "Нет";
    return value;
  }

  //   const deleteUser = () => {
  //     dispatch(deleteRolePost({ token: token, code: modal.data.code }));

  //     dispatch(closeModal());
  //   };

  //   const upDateUser = (data) => {
  //     dispatch(
  //       editUser({
  //         token: token,
  //         code: modal.data.code,
  //         name: data.name,
  //         description: data.description,
  //         isActive: data.isActive === "true",
  //       }),
  //     );
  //     reset();
  //     dispatch(closeModal());
  //   };

  //   function closeAllModal() {
  //     reset();
  //     dispatch(closeModal());
  //   }

  //   const modalEditPost = (
  //     <div>
  //       <form onSubmit={handleSubmit(upDateUser)}>
  //         {modal.data && (
  //           <>
  //             <div style={{ display: "flex" }}>
  //               Вы редактируете роль с кодом
  //               <div className={styles.roleCode}>{modal.data?.code}</div>
  //             </div>
  //             <div className={styles.modalСreateContent}>
  //               <div>Название</div>
  //               <input
  //                 type="text"
  //                 defaultValue={modal.data.name}
  //                 {...register("name")}
  //               ></input>
  //               <div>Описание</div>
  //               <input
  //                 type="text"
  //                 defaultValue={modal.data.description}
  //                 {...register("description")}
  //               ></input>
  //               <div>Активна</div>
  //               <div style={{ display: "flex" }}>
  //                 <label>
  //                   <input
  //                     type="radio"
  //                     name="active"
  //                     value="true"
  //                     defaultChecked={modal.data.isActive === true}
  //                     {...register("isActive")}
  //                   ></input>
  //                   Активна
  //                 </label>
  //                 <label>
  //                   <input
  //                     type="radio"
  //                     name="active"
  //                     value="false"
  //                     defaultChecked={modal.data.isActive === false}
  //                     {...register("isActive")}
  //                   ></input>
  //                   Не активна
  //                 </label>
  //               </div>
  //             </div>
  //             <div>
  //               <button className={styles.buttonCreateModal} type="submit">
  //                 Обновить
  //               </button>
  //               <button
  //                 className={styles.buttonExitCreateModal}
  //                 type="button"
  //                 onClick={closeAllModal}
  //               >
  //                 Отмена
  //               </button>
  //             </div>
  //           </>
  //         )}
  //       </form>
  //     </div>
  //   );

  //   const modaldeletePost = (
  //     <div>
  //       <div style={{ display: "flex", marginLeft: 20, fontSize: 22 }}>
  //         Вы точно хотите удалить роль
  //         <div style={{ marginLeft: 7, color: "red" }}>{modal.data?.code}</div>
  //       </div>
  //       <div
  //         style={{
  //           display: "flex",
  //         }}
  //       >
  //         <button
  //           type="button"
  //           className={styles.buttonModalExit}
  //           onClick={closeAllModal}
  //         >
  //           отмена
  //         </button>
  //         <button className={styles.buttonModalDelete} onClick={deletePost}>
  //           удалить
  //         </button>
  //       </div>
  //     </div>
  //   );

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
                  {renderCellValue(row[col], col)};
                </td>
              ))}

              <td>
                <RowActions data={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalWindow className={styles.modal} open={modal.type === "edit"}>
        {modal.type === "edit" && modal.data && modalEditPost}
      </ModalWindow>
    </>
  );
}
