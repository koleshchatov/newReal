import { useAuthContext } from "../auth/AuthContext";
import { deleteRole } from "../servises/role.service";
import styles from "./form.module.css";

export default function DataGrid({ data, columnConfig = {} }) {
  const { token } = useAuthContext();

  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  const columns = Object.keys(data[0]);

  function deletePost(e, data) {
    (e) => {
      console.log(e);
    };
    deleteRole({ token: token, code: e.id });
  }

  function editPost() {
    console.log(2);
  }

  return (
    <table className={styles.grid}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className={columnConfig[col]?.headerClass}>
              {col}
            </th>
          ))}
          <th>
            <div>Действия</div>
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col} className={columnConfig[col]?.cellClass}>
                {row[col]}
              </td>
            ))}

            <td>
              <button className={styles.buttonEdit} onClick={editPost}>
                <span>Редактировать</span>
              </button>
              <button className={styles.buttonDelete} onClick={deletePost}>
                <span>Удалить</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
