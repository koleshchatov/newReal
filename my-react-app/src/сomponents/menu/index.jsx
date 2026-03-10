import MenuList from "./menuList";

import { menuLists } from "../../config/menuLists";

export default function Menu() {
  return (
    <>
      <div style={{ marginBottom: 20, fontSize: 14 }}>EASSP Admin</div>

      <div>
        {menuLists.map((list) => (
          <MenuList {...list} key={list.id} />
        ))}
      </div>
    </>
  );
}
