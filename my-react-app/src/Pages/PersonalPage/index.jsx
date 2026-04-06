import DataGridUsers from "./form";
import { useEffect } from "react";
import { columnConfigUsers } from "../../config/columnConfigUsers";
import styles from "./form.module.css";
import ModalWindow from "../../сomponents/modalWindow/modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "./userSlice";

export default function personalPage() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { users, modal, loading, error } = useSelector((state) => state.user);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      dispatch(userList(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <div>
        <h2>Пользователи</h2>
      </div>
      <DataGridUsers
        data={users}
        columnConfig={columnConfigUsers}
      ></DataGridUsers>
    </>
  );
}
