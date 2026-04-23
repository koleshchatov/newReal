import Menu from "../Menu";
import { Outlet } from "react-router-dom";
import Header from "../Menu/header";
import styles from "./layout.module.scss";

export default function Layout() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={styles.menuLayout}>
          <Menu />
        </div>

        <div className={styles.container}>
          <div className={styles.headerLayout}>
            <Header />
          </div>
          <div className={styles.outletLayout}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
