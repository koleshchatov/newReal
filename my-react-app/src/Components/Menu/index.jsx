import MenuList from "./menuList";
import styles from "./menu.module.scss";

import { menuLists } from "../../config/menuLists";

export default function Menu() {
  return (
    <>
      <div className={styles.headerEassp}>EASSP Admin</div>

      <div>
        {menuLists.map((list) => (
          <MenuList {...list} key={list.id} />
        ))}
      </div>
    </>
  );
}
