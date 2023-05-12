import React from "react";
import MUIDataTable from "mui-datatables";
import { getColumnName } from "../../Utils/utilities";

import "./NewTable.css";
import MetaDataCard from "../MetaDataCard/MetaDataCard";

export const ExpandableRowTable = (props) => {
  const options = {
    filter: true,
    setCellProps: () => {
      return {
        className: "tableCell",
      };
    },
    selectableRows: false,
    filterType: "multiselect",
    rowsPerPage: 10,
    draggableColumns: {
      enabled: true,
    },
    setRowProps: (row, rowIndex) => {
      return {
        className: rowIndex % 2 === 0 ? "even-row" : "odd-row",
        style: { cursor: "pointer" },
      };
    },

    expandableRows: props.expandable,
    onRowClick: (rowData, rowMeta) => {
      if (props.onRowClickEnabled) {
        props.onRowClick(rowMeta.dataIndex);
      }
    },
    renderExpandableRow: (rowData, rowMeta) => {
      const dataIndex = rowMeta.dataIndex;
      const rowObject = props.Data[dataIndex];
      let keys = [];
      let values = [];
      if (rowObject["meta_data"]) {
        Object.keys(rowObject["meta_data"]).forEach((key) => {
          keys.push(key);
          values.push(rowObject["meta_data"][key]);
        });
      }
      return (
        <React.Fragment>
          <tr>
            <td colSpan={props.regularColumns.length}>
              <MetaDataCard keys={keys} values={values} />
            </td>
          </tr>
        </React.Fragment>
      );
    },
  };

  const columns = props.Data && getColumnName(props.Data[0], props.regularColumns);
  return (
    <div className="table-container">
      <MUIDataTable
        title={props.title}
        data={props.Data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default ExpandableRowTable;
