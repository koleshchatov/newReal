import Icon from "../Icon/icon";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";

export default function MenuList({ label, to, items, icon }) {
  return (
    <>
      <aside className={styles.menuHeader}>
        {items ? (
          <details>
            <summary className={styles.menuItem}>
              <Icon className={styles.icon} src={icon}></Icon>
              {label}
            </summary>
            {items.map((item) => (
              <div key={item.id}>
                <Link className={styles.menuList} to={item.to}>
                  {item.label}
                </Link>
              </div>
            ))}
          </details>
        ) : (
          <div>
            <Icon className={styles.icon} src={icon}></Icon>
            <Link className={styles.menu} to={to}>
              {label}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
