import styles from "../../../Components/Form/form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeModalUser } from "../userSlice";

export default function ModalShowUserPost() {
  const { reset } = useForm();
  const dispatch = useDispatch();

  function closeAllModal() {
    reset();
    dispatch(closeModalUser());
  }
  return (
    <>
      <div className={styles.container}>
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
