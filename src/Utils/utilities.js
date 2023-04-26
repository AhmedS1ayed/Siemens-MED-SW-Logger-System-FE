import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export const getColumnsName = (data, columnWidts = {}) => {
  return Object.keys(data)
    .map((field) => {
      if (typeof data[field] !== "object") {
        let columnWidth = columnWidts[field] || 120;
        return {
          field,
          headerName: field,
          headerClassName: "super-app-theme--header",
          renderCell: (params) => {
            if (params.value === true) {
              return (
                <span className="success-class">
                  <CheckIcon />
                </span>
              );
            } else if (params.value === false) {
              return (
                <span className="failed-class">
                  <ClearIcon />
                </span>
              );
            } else {
              return params.value;
            }
          },
          width: columnWidth,
        };
      }
      return null;
    })
    .filter((column) => column !== null);
};

export const getColumnName = (data) => {
  let columnsName = [];
  Object.keys(data).forEach((key) => {
    if (typeof data[key] !== "object") {
      let newColumn = {
        name: key,
        label: key,
        options: {
          customBodyRender: (value) => {
            if (typeof value === "boolean")
              return value ? (
                <CheckIcon className="success-class" />
              ) : (
                <ClearIcon className="failed-class" />
              );
            else return value;
          },
        },
      };
      if (
        !columnsName.find((column) => {
          return JSON.stringify(column) === JSON.stringify(newColumn);
        })
      ) {
        columnsName.push(newColumn);
      }
    }
  });
  return columnsName;
};
