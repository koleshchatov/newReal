import { useState } from "react";
import styles from "./form.module.css";

import { useDispatch } from "react-redux";
import { openModalUser } from "../../pages/personalPage/userSlice";
import { openModalRole } from "../../pages/rolePage/roleSlice";

export default function RowActions({ data, type }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const menuItem = {
    display: "block",
    width: "100%",
    background: "white",
    zIndex: 1000,
    paddingBottom: "10px",
    cursor: "pointer",
  };

  function openTypeModal({ type }) {
    dispatch(openModalUser({ type, data }));
  }

  function openTypeModalRole({ type }) {
    dispatch(openModalRole({ type, data }));
  }

  if (type === "roleActions")
    return (
      <td>
        <button
          className={styles.buttonEdit}
          onClick={() => openTypeModalRole({ type: "editRole" })}
        >
          <span>Редактировать</span>
        </button>
        <button
          className={styles.buttonDelete}
          onClick={() => openTypeModalRole({ type: "deleteRole" })}
        >
          <span>Удалить</span>
        </button>
      </td>
    );

  if (type === "userActions")
    return (
      <td>
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
      </td>
    );
}
