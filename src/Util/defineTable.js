const defineTable = (data) => {
  let newColumn = "";
  let columnsDefinition = "";

  for (const key of Object.keys(data)) {
    if (data[key].toString() === "[object Object]") {
      continue;
    }
    newColumn = {
      name: key,
      selector: (row) => {
        return row[key];
      },
      style: {
        color: "white",
        font: "sans-serif",
      },
    };
    columnsDefinition = [...columnsDefinition, newColumn];
  }
  return columnsDefinition;
};

export default defineTable;