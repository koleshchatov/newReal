import styles from "./form.module.css";
import RowActions from "./rowActions";

export default function DataGrid({ data, columnConfig = {}, type }) {
  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  function renderCellValue(value, col) {
    if (value === null || value === undefined) return "";
    if (col === "role") return value?.name || "";
    if (col === "position") return value?.name || "";
    if (typeof value === "boolean") return value ? "Да" : "Нет";
    return value;
  }

  const columns = Object.keys(data[0]);

  return (
    <>
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
                  {renderCellValue(row[col], col)}
                </td>
              ))}

              <RowActions data={row} type={type} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
