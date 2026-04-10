import styles from "../../../сomponents/form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalUser, createNewUser } from "../userSlice";

export default function ModalEditUserPost() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Редактировать профиль</div>
      </div>
    </div>
  );
}
