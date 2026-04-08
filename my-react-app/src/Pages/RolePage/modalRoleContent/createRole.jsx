import styles from "../../../сomponents/form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalRole, createRole } from "../roleSlice";

export default function ModalCreateRole() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);

  function closeModalCreateRole() {
    dispatch(closeModalRole());
  }

  const createRoles = (data) => {
    dispatch(
      createRole({
        token: token,
        code: data.code,
        name: data.name,
        description: data.description,
        isActive: data.isActive === "true",
      }),
    );

    dispatch(closeModalRole());
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
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
        <div>Код:</div>
        <input type="text" {...register("code")}></input>
        <div>Название:</div>
        <input type="text" {...register("name")}></input>
        <div>Описание:</div>
        <input type="text" {...register("description")}></input>
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
