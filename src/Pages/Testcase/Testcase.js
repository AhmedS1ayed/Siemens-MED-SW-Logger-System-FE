import React from "react";
import { Link, useLocation } from "react-router-dom";
import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getColumnsName } from "../../Utils/utilities";
import { Container } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";

export default function Testcase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
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
        title="Test Cases"
        Data={data}
        regularColumns={data_columns}
        onRowClickEnabled={false}
      />
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
    </Container>
  );
}
