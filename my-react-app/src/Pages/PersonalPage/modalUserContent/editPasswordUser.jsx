import styles from "../../../Components/Form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeModalUser } from "../userSlice";

export default function ModalEditPasswordUserPost() {
  const { reset } = useForm();
  const dispatch = useDispatch();

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }
  return (
    <div>
      <div className={styles.container}>
        <button
          type="button"
          onClick={closeAllModal}
          className={styles.closeBtn}
        >
          Х
        </button>
        <div>Сменить пароль</div>
      </div>
    </div>
  );
}
