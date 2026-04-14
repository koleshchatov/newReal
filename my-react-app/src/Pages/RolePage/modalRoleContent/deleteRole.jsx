import styles from "../../../Components/Form/form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModalRole, deleteRolePost, roleList } from "../roleSlice";

export default function ModalDeleteRole() {
  const dispatch = useDispatch();
  const { reset } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { modal } = useSelector((state) => state.role);

  const deletePost = async () => {
    try {
      await dispatch(
        deleteRolePost({ token: token, code: modal.data.code }),
      ).unwrap();
      await dispatch(roleList(token)).unwrap();
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
      <div style={{ display: "flex", marginLeft: 20, fontSize: 22 }}>
        Вы точно хотите удалить роль
        <div style={{ marginLeft: 7, color: "red" }}>{modal.data?.code}</div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button
          type="button"
          className={styles.buttonModalExit}
          onClick={closeAllModal}
        >
          отмена
        </button>
        <button className={styles.buttonModalDelete} onClick={deletePost}>
          удалить
        </button>
      </div>
    </div>
  );
}
