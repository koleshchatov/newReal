import styles from "./menu.module.css";
import { Link } from "react-router-dom";

export default function MenuList({ id, label, to, items }) {
  return (
    <>
      <aside className={styles.menu}>
        {items ? (
          <details>
            <summary>{label}</summary>
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
            <Link className={styles.menu} to={to}>
              {label}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
