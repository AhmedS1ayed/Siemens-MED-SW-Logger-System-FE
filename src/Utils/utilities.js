import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const pushColumn = (data_columns, inputKey) => {
   let newColumn = {
    name: inputKey,
    label: inputKey,
    options: {
      display : (inputKey === "_id" || inputKey === "id" ) ? false : true ,

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
};

export const getColumnName = (data, data_columns) => {
  Object.keys(data).forEach((key) => {
    // console.log("key", key , "data[key]", data[key]);

    if (typeof data[key] !== "object") {
      pushColumn(data_columns, key);
    }
    else if(key === "metaData"){
      const obj = data[key];
      Object.keys(obj).forEach((objKey) => {
        if (!data_columns.find((column) => column.name === objKey) && objKey !== "metaData" && objKey !== "design_info") {
          pushColumn(data_columns, objKey);
        }
      });
    }
  });
  return data_columns;
};
