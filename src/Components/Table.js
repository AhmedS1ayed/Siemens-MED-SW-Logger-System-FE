import DataTable, { createTheme } from "react-data-table-component";
import { useState } from "react";
createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#000000",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#ffffff",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const Table = (props) => {
  //For Generic Tables
  const defineTable = (data) => {
    let newColumn = "";
    let columnss = "";

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
      columnss = [...columnss, newColumn];
    }

    return columnss;
  };
  const [columns, setColumns] = useState(defineTable(props.Data[0]));

  // FOR EXPANDED DATA -----------------------------------------
              // const dataExpandedComponent = (data) => {
              //   let output = "";
              //   for (const key of Object.keys(data)) {
              //     if (data[key].toString() === "[object Object]") {
              //       output +=
              //         "-------------------\n" +
              //         key +
              //         " : " +
              //         "\n" +
              //         dataExpandedComponent(data[key]);
              //       continue;
              //     }
              //     const value = data[key];
              //     output += key + " : " + value + "\n";
              //   }
              //   return output;
              // };

              // const ExpandedComponent = ({ data }) => (
              //   <pre>{dataExpandedComponent(data)}</pre>
              // );
  // FOR EXPANDED DATA -----------------------------------------




  const rowClickedHandler = (event) => {
    // setColumns([
    //   {
    //     name: "id",
    //     selector: (row) => {
    //       return row["id"];
    //     },
    //     style: {
    //       color: "white",
    //       font: "sans-serif",
    //     },
    //   },
    //   {
    //     name: "Test Suite",
    //     selector: (row) => row.testSuite,
    //     style: {
    //       color: "white",
    //       font: "sans-serif",
    //     },
    //   },
    // ]);
    //console.log(event.id);
    props.onRowClicked(event);
  };

  return (
    <DataTable
      pagination
      // paginationPerPage={18}
      columns={columns}
      data={props.Data}
      // expandableRows
      // expandableRowsComponent={ExpandedComponent}
      theme="solarized"
      onRowClicked={rowClickedHandler}
    />
  );
};

export default Table;
