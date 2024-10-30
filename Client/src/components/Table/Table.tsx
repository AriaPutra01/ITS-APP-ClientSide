import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "../ui/button";

interface RowProps {
  title: string;
  variant:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  action: (selectedRows: any[]) => void;
}

interface TableProps {
  title: string;
  columns: any[];
  data: any[];
  CustomHeader?: React.ReactNode;
  SelectedRows: RowProps;
}

export default function Table({
  title,
  columns,
  data,
  CustomHeader,
  SelectedRows,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const handleSelect = ({ selectedRows }: any) => {
    setSelectedRows(selectedRows);
  };

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
    setSelectedRows([]);
  };

  const handleTriggerSelectedRows = () => {
    SelectedRows.action(selectedRows);
    setToggleClearRows(!toggledClearRows);
    setSelectedRows([]);
  };

  return (
    <div className="w-full rounded-lg p-2 overflow-auto">
      <div className="flex justify-between">
        <div className="flex gap-1.5 items-center mx-2 mb-2">
          {CustomHeader}
          <div className="flex gap-2">
            <Button
              className="w-max"
              variant={SelectedRows.variant}
              onClick={handleTriggerSelectedRows}
              disabled={selectedRows.length === 0}>
              {SelectedRows.title}
            </Button>
            {selectedRows.length > 0 && (
              <Button
                className="w-max"
                variant={"secondary"}
                onClick={handleClearRows}>
                Cancel
              </Button>
            )}
          </div>
        </div>
        // * search
      </div>
      <div className="overflow-auto">
        {/* Table */}
        <DataTable
          title={`Tabel ${title}`}
          columns={columns}
          data={data}
          onSelectedRowsChange={handleSelect}
          clearSelectedRows={toggledClearRows}
          selectableRows
          pagination
          highlightOnHover
          striped
          responsive
          pointerOnHover
          fixedHeader
        />
      </div>
    </div>
  );
}
