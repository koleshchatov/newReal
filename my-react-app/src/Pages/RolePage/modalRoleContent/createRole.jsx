import styles from "../../../Components/Form/form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalRole, createRole, roleList } from "../roleSlice";

export default function ModalCreateRole() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);

  function closeModalCreateRole() {
    dispatch(closeModalRole());
  }

  const createRoles = async (data) => {
    try {
      await dispatch(
        createRole({
          token: token,
          code: data.code,
          name: data.name,
          description: data.description,
          isActive: data.isActive === "true",
        }),
      ).unwrap();
      await dispatch(roleList(token)).unwrap();

      dispatch(closeModalRole());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <button
          type="button"
          onClick={closeModalCreateRole}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div> Создать роль</div>
      </div>
      <div className={styles.modalСreateContent}></div>
      <form onSubmit={handleSubmit(createRoles)}>
        <label htmlFor="roleCode">Код:</label>
        <input
          className={styles.inputModal}
          id="roleCode"
          type="text"
          {...register("code")}
        />
        <label htmlFor="nameRole">Название:</label>
        <input
          className={styles.inputModal}
          id="nameRole"
          type="text"
          {...register("name")}
        />
        <label htmlFor="descriptionRole">Описание:</label>
        <input
          className={styles.inputModal}
          id="descriptionRole"
          type="text"
          {...register("description")}
        />
        <label htmlFor="isActive">Активна</label>
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

        <div>
          <button className={styles.buttonCreateModal} type="submit">
            Создать
          </button>
          <button
            className={styles.buttonExitCreateModal}
            type="button"
            onClick={closeModalCreateRole}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
