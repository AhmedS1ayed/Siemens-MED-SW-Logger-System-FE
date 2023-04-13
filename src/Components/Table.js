import DataTable, { createTheme } from "react-data-table-component";

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
    
    props.onRowClicked(event);
    console.log("record event : " , event);
  };

  return (
    <DataTable
      pagination
      // paginationPerPage={18}
      columns={props.columns}
      data={props.data}
      // expandableRows
      // expandableRowsComponent={ExpandedComponent}
      theme="solarized"
      onRowDoubleClicked={rowClickedHandler}
      pointerOnHover
      highlightOnHover
    />
  );
};

export default Table;
