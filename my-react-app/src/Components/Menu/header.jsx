import { useDispatch } from "react-redux";
import Button from "../Вutton/button";
import Icon from "../icon/icon";
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
      <h3>Админ-панель</h3>

      <Button
        className={styles.buttonHeader}
        onClick={handleClick}
        title="Выйти"
      >
        <Icon className={styles.iconExit} src={logoutIcon}></Icon>
      </Button>
    </>
  );
}
