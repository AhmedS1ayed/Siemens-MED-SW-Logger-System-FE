import React from "react";
import { Link, useLocation } from "react-router-dom";
import data from "../../Data/Mock_Test_Case.json";
import { getColumnsName } from "../../Utils/utilities";
import DataGrid from "../../Components/DataGrid/DataGrid.js";
import { Container } from "@mui/material";

export default function Testcase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");

  let data_columns = getColumnsName(data[0], { dateCreated: 250 });
  data_columns.push({
    field: "link",
    headerName: "Link",
    headerClassName: "super-app-theme--header",
    width: 120,
    renderCell: (params) => {
      let testcaseId = params.id;

      return (
        <Link
          to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
        >
          Show more
        </Link>
      );
    },
  });
  return (
    <Container>
      <DataGrid data={data} data_columns={data_columns} />
    </Container>
  );
}
