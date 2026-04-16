import styles from "./form.module.css";

export default function DataGrid({ data, columnConfig = {}, getActions }) {
  if (!data || data.length === 0) {
    return <div>Нет данных</div>;
  }

  function renderCellValue(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "boolean") return value ? "Да" : "Нет";
    return value.name ? value.name : value;
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
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col} className={columnConfig[col]?.cellClass}>
                  {renderCellValue(row[col])}
                </td>
              ))}
              <td>{getActions ? getActions(row) : []}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
