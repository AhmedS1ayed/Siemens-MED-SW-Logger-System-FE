import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const pushColumn = (data_columns, inputKey) => {
  let modifiedKey = inputKey.split("_");
  let newColumn = {
    name: inputKey,
    label: modifiedKey.join(" "),
    options: {
      display:
        inputKey === "_id" || inputKey === "id" || inputKey === "__v"
          ? "excluded"
          : true,
      setCellHeaderProps: () => {
        return {
          className: "tableHeadCell",
        };
      },
      setCellProps: () => {
        return {
          className: "tableCell",
        };
      },
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
    data_columns && !data_columns.find((column) => {
      return JSON.stringify(column) === JSON.stringify(newColumn);
    })
  ) {
    data_columns.push(newColumn);
  }
};

export const getColumnName = (data, data_columns) => {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] !== "object") {
      pushColumn(data_columns, key);
    } else if (key === "metaData") {
      const obj = data[key];
      Object.keys(obj).forEach((objKey) => {
        if (
          data_columns && !data_columns.find((column) => column.name === objKey) &&
          objKey !== "metaData" &&
          objKey !== "design_info" &&
          typeof obj[objKey] !== "object"
        ) {
          pushColumn(data_columns, objKey);
        }
      });
    }
  });
  return data_columns;
};

export const getKeys = (data) => {
  let dataKeys = [];
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "object") {
      dataKeys.push(key);
    }
  });
  return dataKeys;
};

export const isNumber = (item) => {
  for (let i = 0; i < item.length; i++) {
    if ((item[i] > "a" && item[i] < "z") || (item[i] > "A" && item[i] < "Z"))
      return false;
  }
  return true;
};

export const flattenObject = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const getFilteredData = (data, data_columns) => {
  if (typeof data !== "undefined" && data !== null && data.length > 0) {
    data.map((item) => {
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
  }
};

export const cleanData = (str) => {
  if(Number.isInteger(str)) return str; 
  str = str.slice().replaceAll('_' , ' ');
  str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return word.toUpperCase();
  }).replace(/\s+/g, ' ');
  return str;
}


export const getItemId = (item , nestedData)=>
{
  let itemN = "Not Found";
  if (nestedData[item]["id"] != undefined)
    itemN = nestedData[item]["id"];
  else if (nestedData[item]["master_id"] != undefined)
    itemN = nestedData[item]["master_id"];
  else if (nestedData[item]["slave_id"] != undefined)
    itemN = nestedData[item]["slave_id"];
  else if (nestedData[item]["Port Offset"] != undefined)
    itemN = nestedData[item]["Port Offset"];
  else  return item;
  
  return itemN;
}