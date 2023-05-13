import { getColumnName } from "./utilities";

export const dataRepresentationVT = (data,filteredData) =>{
    let data_columns = [];
    data.forEach((row) => getColumnName(row, data_columns));
  
  
    let meta = [];
    let combinedData = [];
  
    if (
      typeof data[0] !== "undefined" &&
      typeof data[0]["validationPoints"] !== "undefined"
    ) {
      for (let i = 0; i < data.length; i++) {
        meta.push(data[i]["metaData"]);
      }
    }
  
    if (meta) {
      if (data_columns) {
        filteredData = data.map((item) => {
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
  
        let metaFiltered = meta.map((item) => {
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
  
        combinedData = filteredData.map((item, index) => {
          return { ...item, ...metaFiltered[index] };
        });
      }
    }

    return [combinedData,data_columns];
}