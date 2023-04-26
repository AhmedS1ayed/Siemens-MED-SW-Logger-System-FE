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
