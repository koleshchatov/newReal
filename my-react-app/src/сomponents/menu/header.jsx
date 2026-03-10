import { useAuthContext } from "../../auth/AuthContext";
import Button from "../button/button";
import Icon from "../icon/icon";
import styles from "./menu.module.css";

export default function Header() {
  const { logout } = useAuthContext();

  function handleClick() {
    logout();
  }

  return (
    <>
      <h3>Админ-панель</h3>

      <Button
        title="Выйти"
        className={styles.buttonHeader}
        onClick={handleClick}
      >
        <Icon className={styles.iconExit} src="../../public/выйти.png"></Icon>
      </Button>
    </>
  );
}
