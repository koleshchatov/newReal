import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import styles from "./menu.module.css";

export default function Menu() {
  const { logout } = useAuthContext();
  function handleClick() {
    logout();
  }

  return (
    <>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to={"/"}>Пользователи</Link>
          </li>
          <li>
            <Link to={"/rolePage"}>Роли</Link>
          </li>
          <li>
            <Link to={"/opportunitiesPage"}>Возможности</Link>
          </li>
          <li>
            <Link to={"/accessMatrixPage"}>Матрица доступов</Link>
          </li>
          <li>
            <Link to={"/nomenclaturePage"}>Номенклатура</Link>
          </li>
          <li>
            <Link to={"/guidePage"}>Справочники</Link>
          </li>
        </ul>
      </div>
      <button onClick={handleClick}>Выйти</button>
    </>
  );
}
