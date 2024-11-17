import { useMemo } from "react";
import App from "@/components/Layouts/App";
import Table from "@/features/MainData/components/Sections/Table/DynamicTable";
import FilterTableCell from "@/Utils/FilterTableCell";
import { TableLoading } from "@/features/MainData/components/Elements/Loading/TableLoading";
import { useFilter } from "@/features/MainData/hooks/useFilter";
import {
  useFetchData,
  useDeleteData,
  usePutData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { UploadFields } from "@/config/config/Upload";
import { useSelectionDeletion } from "@/features/MainData/hooks/useSelectionDeletion";
import ShowDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/ShowDialog";
import AddForm from "@/features/MainData/components/Sections/Table/Actions/Columns/AddForm";
import DeleteDialog from "@/features/MainData/components/Sections/Table/Actions/Columns/DeleteDialog";
import EditForm from "@/features/MainData/components/Sections/Table/Actions/Columns/EditForm";
import UploadForm from "@/features/MainData/components/Sections/Table/Actions/Columns/UploadForm";
import { useToken } from "@/features/MainData/hooks/useToken";
import { extractMiddle } from "@/features/MainData/hooks/useFormat";
// MEMO
import { MemoFields } from "@/features/MainData/config/formFields/Dokumen/Memo";

export default function Memo() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();
  
  // FETCH & MUTATION HOOKs
  const { data: memos, isLoading } = useFetchData({
    queryKey: ["memos"],
    axios: {
      url: "/memo",
    },
  });
  const PostMemo = usePostData({
    axios: {
      url: "/memo",
    },
  });
  const DeleteMemo = useDeleteData({
    axios: {
      url: "/memo",
    },
  });
  const PutMemo = usePutData({
    axios: {
      url: "/memo",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = MemoFields.map((field) => ({
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    }));

    const actionColumns = [
      {
        name: "Action By",
        selector: (row: any) => row.create_by,
        sortable: true,
      },
      {
        name: "Action",
        cell: (data: any) => (
          <div className="flex gap-1">
            <ShowDialog
              title={`Form detail data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...MemoFields,
                    { name: "create_by", label: "Action By" },
                  ]);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
            />
            <DeleteDialog
              title={`Hapus data ${initialData?.no_memo}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteMemo,
                queryKey: ["memos"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields(MemoFields);
                  setInitialData({...data, no_memo: extractMiddle(data.no_memo)});
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutMemo,
                queryKey: ["memos"] ,
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_memo}`}
              event={{
                onOpen: () => {
                  setFields(UploadFields);
                  setInitialData(data);
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              url={{
                getUrl: "/filesMemo",
                postUrl: "/uploadFileMemo",
                downloadUrl: "/downloadMemo",
                deleteUrl: "/deleteMemo",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [MemoFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteMemo,
    queryKey: ["memos"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Memo`}
        form={{
          mutation: PostMemo,
          queryKey: ["memos"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(MemoFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
    </div>
  );

  // FILTER NOMEMO
  const { filteredData, renderFilter } = useFilter({
    data: memos,
    filteredItem: "no_memo",
  });

  return (
    <App services="Memo">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Memo"
            columns={columns}
            data={filteredData || []}
            CustomHeader={{
              left: renderSubHeader,
              right: renderFilter,
            }}
            SelectedRows={{
              title: "Hapus",
              variant: "destructive",
              action: handleSelectedDeletion,
            }}
          />
        )}
      </div>
    </App>
  );
}
