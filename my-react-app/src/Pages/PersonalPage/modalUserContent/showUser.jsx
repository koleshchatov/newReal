import styles from "../../../сomponents/form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalUser, createNewUser } from "../userSlice";

export default function ModalShowUserPost() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.user);

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
      </div>
      <div>Профиль пользователя</div>
    </>
  );
}
