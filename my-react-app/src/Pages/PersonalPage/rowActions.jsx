import { useState } from "react";
import styles from "./form.module.css";

import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "./userSlice";

export default function RowActions({ data }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { modal } = useSelector((state) => state.user);

  const menuItem = {
    display: "block",
    width: "100%",
    background: "white",
    zIndex: 1000,
    paddingBottom: "10px",
    cursor: "pointer",
  };

  function openTypeModal({ type }) {
    dispatch(openModal({ type, data }));
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className={styles.buttonEdit} onClick={() => setOpen(!open)}>
        <span>Действия</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 1000,
            background: "fff",
            minWidth: "250px",
          }}
        >
          <ul>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "showUser" })}
            >
              Посмотреть
            </li>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "editUser" })}
            >
              Редактировать профиль
            </li>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "editRoleUser" })}
            >
              Сменить роль
            </li>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "editPositionUser" })}
            >
              Сменить должность
            </li>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "editPasswordUser" })}
            >
              Сменить пароль
            </li>
            <li
              style={{ ...menuItem }}
              onClick={() => openTypeModal({ type: "unBlockUser" })}
            >
              Разблокировать
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
