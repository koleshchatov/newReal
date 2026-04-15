import { useDispatch } from "react-redux";
import Button from "../Button/button.jsx";
import Icon from "../Icon/icon.jsx";
import styles from "./menu.module.css";
import { logout } from "../../auth/authSlice";
import logoutIcon from "../../assets/icons/logout.png";

export default function Header() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(logout());
  }

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.adminPanel}>Админ-панель</h3>

        <Button
          className={styles.buttonHeader}
          onClick={handleClick}
          alt=""
          aria-label="Выйти из админ-панели"
        >
          <Icon
            className={styles.iconExit}
            src={logoutIcon}
            aria-Hidden="true"
          />
        </Button>
      </div>
    </>
  );
}
