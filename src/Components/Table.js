import DataTable, { createTheme } from "react-data-table-component";

const columns = [
  {
    name: "id",
    selector: (row) => row.id,
    style: {
      color: "white",
      font: "sans-serif",
    },
  },
  {
    name: "Test Suit",
    selector: (row) => row.testSuite,
    style: {
      color: "white",
      font: "sans-serif",
    },
  },
  {
    name: "Test Case",
    selector: (row) => row.testCase,
    style: {
      color: "white",
      font: "sans-serif",
    },
  },
  {
    name: "Validation State",
    selector: (row) => row.validationState,
    style: {
      color: "white",
      font: "sans-serif",
    },
  },
];

// const dataExpandedRecursion = (obj) =>{
//     for (const key of Object.keys(obj)) 
//     {
        
//         const value = data[key];
//         output+= key + " : " + value + "\n" ;
//     }
// };

const dataExpandedComponent = (data) => {
    let output="";
    for (const key of Object.keys(data)) 
    {
        if(data[key].toString() === '[object Object]')
        {
            output += "-------------------\n" + key + " : " + "\n" + dataExpandedComponent(data[key]);
            continue;
        }
        console.log(data[key]);
        const value = data[key];
        output+= key + " : " + value + "\n" ;
    }
  return output;
};

const ExpandedComponent = ({ data }) => (
  <pre>{dataExpandedComponent(data)}</pre>
);

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

  return (
    <DataTable
      pagination
      // paginationPerPage={18}
      columns={columns}
      data={props.Data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      theme="solarized"
    />
  );
};

export default Table;
