import { useDispatch } from "react-redux";
import Button from "../button/button";
import Icon from "../icon/icon";
import styles from "./menu.module.css";
import { logout } from "../../auth/authSlice";

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
        <Icon className={styles.iconExit} src="../../public/выйти.png"></Icon>
      </Button>
    </>
  );
}
