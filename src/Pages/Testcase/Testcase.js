import React from "react";
import { Link, useLocation } from "react-router-dom";
import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getColumnsName } from "../../Utils/utilities";
import DataGrid from "../../Components/DataGrid/DataGrid.js";
import { Container } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";

export default function Testcase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");

  // let data_columns = getColumnsName(data[0], { dateCreated: 250 });
  // data_columns.push({
  //   field: "link",
  //   headerName: "Link",
  //   headerClassName: "super-app-theme--header",
  //   width: 120,
  //   renderCell: (params) => {
  //     let testcaseId = params.id;

  //     return (
  //       <Link
  //         to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
  //       >
  //         Show more
  //       </Link>
  //     );
  //   },
  // });
  let regularColumns = [];

  data.forEach((row) => {
    regularColumns = getColumnName(row);
  });

  regularColumns.push({
    name: "Link",
    label: "Link",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const testcaseId = tableMeta.rowData[0];
        return (
          <Link
            to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
          >
            <LinkIcon />
          </Link>
        );
      },
    },
  });

  return (
    <Container maxWidth="xl">
      <ExpandableRowTable
        title="Test Suites"
        Data={data}
        regularColumns={regularColumns}
      />
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
    </Container>
  );
}
