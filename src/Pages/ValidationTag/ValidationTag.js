import { Container } from "@mui/material";
import ExpandableRowTable from "../../Components/DataTable/DataTable";
import ValidaitonPoint from "../../Components/ValidationPoint/ValidationPoint";
import ValidationTagHook from "../../Hook/validation-tag-hook";

export default function ValidationTag() {
  const [combinedData, data_columns, handleRowClick, data, selectedRow] =
    ValidationTagHook();
  return (
    <Container maxWidth="x">
      <h1 style={{textAlign:"center" , color:"var(--validation-point-font-color)" ,fontSize:"50px"}} >Validation Tags</h1>
      <ExpandableRowTable
        title="Validation Tags"
        Data={combinedData}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={true}
        onRowClick={handleRowClick}
      />
      <ValidaitonPoint data={data} selected_row={selectedRow} />
    </Container>
  );
}
