import React from "react";
import { Container } from "@mui/material";
import data from "../../Data/Mock_Data.json";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import { getColumnName } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";

export default function Testsuit() {
  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const testsuitId = tableMeta.rowData[0];
        return (
          <Link to={`/testcases?testsuitId=${testsuitId}`}>
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
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={false}
      />
    </Container>
  );
}
