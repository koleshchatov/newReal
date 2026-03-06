import { useAuthContext } from "../../auth/AuthContext";
import styles from "./menu.module.css";

export default function Header() {
  const { logout } = useAuthContext();

  function handleClick() {
    logout();
  }

  return (
    <>
      <header>
        <h1>Админ-панель</h1>
      </header>
      <button className={styles.buttonHeader} onClick={handleClick}>
        Выйти
      </button>
    </>
  );
}
