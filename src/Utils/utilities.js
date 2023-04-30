import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export const getColumnName = (data, data_columns) => {
  console.log(data);
  Object.keys(data).forEach((key) => {
    if (typeof data[key] !== "object") {
      let newColumn = {
        name: key,
        label: key,
        options: {
          display : (key === "_id" || key === "id" || key === "__v") ? false : true ,

          filterOptions: {
            renderValue: (value) => {
              if (value === "" || value === null || value === undefined) {
                return "(empty)";
              } else if (typeof value === "boolean") {
                return value ? "True" : "False";
              }
              return value;
            },
          },
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
        !data_columns.find((column) => {
          return JSON.stringify(column) === JSON.stringify(newColumn);
        })
      ) {
        data_columns.push(newColumn);
      }
    }
  });
  return data_columns;
};
