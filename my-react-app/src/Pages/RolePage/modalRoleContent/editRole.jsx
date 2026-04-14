import styles from "../../../Components/Form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalRole, editRolePost, roleList } from "../roleSlice";

export default function ModalEditRole() {
  const dispatch = useDispatch();
  const { reset, register, handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { modal } = useSelector((state) => state.role);

  const upDateRole = async (data) => {
    try {
      await dispatch(
        editRolePost({
          token: token,
          code: modal.data.code,
          name: data.name,
          description: data.description,
          isActive: data.isActive === "true",
        }),
      ).unwrap();
      await dispatch(roleList(token)).unwrap();
      reset();
      dispatch(closeModalRole());
    } catch (error) {
      console.error(error);
    }
  };

  function closeAllModal() {
    reset();
    dispatch(closeModalRole());
  }

  return (
    <div>
      <form onSubmit={handleSubmit(upDateRole)}>
        {modal.data && (
          <>
            <div style={{ display: "flex" }}>
              Вы редактируете роль с кодом
              <div className={styles.roleCode}>{modal.data?.code}</div>
            </div>
            <div className={styles.modalСreateContent}>
              <div>Название</div>
              <input
                type="text"
                defaultValue={modal.data.name}
                {...register("name")}
              ></input>
              <div>Описание</div>
              <input
                type="text"
                defaultValue={modal.data.description}
                {...register("description")}
              ></input>
              <div>Активна</div>
              <div style={{ display: "flex" }}>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="true"
                    defaultChecked={modal.data.isActive === true}
                    {...register("isActive")}
                  ></input>
                  Активна
                </label>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="false"
                    defaultChecked={modal.data.isActive === false}
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
                onClick={closeAllModal}
              >
                Отмена
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
