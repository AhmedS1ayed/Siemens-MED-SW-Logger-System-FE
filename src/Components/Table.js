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
