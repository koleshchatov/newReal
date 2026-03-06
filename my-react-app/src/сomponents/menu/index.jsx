import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import styles from "./menu.module.css";
import MenuList from "./menuList";

import { menuLists } from "../../config/menuLists";

export default function Menu() {
  const { logout } = useAuthContext();

  function handleClick() {
    logout();
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>EASSP Admin</div>

      <div>
        {menuLists.map((list) => (
          <MenuList {...list} key={list.id} />
        ))}
      </div>
    </>
  );
}
