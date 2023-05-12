import { flattenObject, getColumnName } from "./utilities";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
export const dataRepresentation = (data,data_columns=[],filteredData=[],flattenedData=[]) => {
    data.forEach((row) => getColumnName(row, data_columns));
  
    let count = 0;
    data_columns.unshift({
      name: "ID",
      label: "ID",
      options: {
        filter: false,
        sort: true,
        customBodyRender: () => {
          if (count === data.length) count = 0;
          count++;
          return count;
        },
      },
    });
  
    data_columns.push({
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let testsuitId = null;
          if (data) {
            testsuitId = data[tableMeta.rowIndex].id;
          }
          return (
            <Link to={`/testcases?testsuitId=${testsuitId || ""}`}>
              <LinkIcon className="custom-link" style={{ color: "black" }} />
            </Link>
          );
        },
      },
    });
    if (data) {
      flattenedData = data.map((item) => flattenObject(item));
    }
    if (flattenedData) {
      if (data_columns) {
        filteredData = flattenedData.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (
              data_columns.some(
                (column) =>
                  column.name.substring(column.name.lastIndexOf(".") + 1) === key
              )
            ) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });
      }}
      console.log('FD :',filteredData);
  return { filteredData, data_columns };
};
