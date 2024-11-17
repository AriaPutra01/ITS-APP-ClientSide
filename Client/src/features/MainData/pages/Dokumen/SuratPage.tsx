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
// SURAT
import { SuratFields } from "@/features/MainData/config/formFields/Dokumen/Surat";

export default function Surat() {
  // TOKEN
  const { userDetails } = useToken();

  // FORM STORE
  const { initialData, setInitialData, setFields } = useFormStore();

  // FETCH & MUTATION HOOKs
  const { data: Surats, isLoading } = useFetchData({
    queryKey: ["surats"],
    axios: {
      url: "/surat",
    },
  });
  const PostSurat = usePostData({
    axios: {
      url: "/surat",
    },
  });
  const DeleteSurat = useDeleteData({
    axios: {
      url: "/surat",
    },
  });
  const PutSurat = usePutData({
    axios: {
      url: "/surat",
      id: initialData.ID,
    },
  });

  // COLUMN
  const columns = useMemo(() => {
    const baseColumns = SuratFields.map((field) => ({
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
              title={`Form detail data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields([
                    ...SuratFields,
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
              title={`Hapus data ${initialData?.no_surat}`}
              event={{
                onOpen: () => setInitialData(data),
                onClose: () => setInitialData({}),
              }}
              form={{
                id: initialData.ID,
                mutation: DeleteSurat,
                queryKey: ["surats"],
              }}
            />
            <EditForm
              title={`Form edit data ${initialData?.no_surat}`}
              event={{
                onOpen: () => {
                  setFields(SuratFields);
                  setInitialData({
                    ...data,
                    no_surat: extractMiddle(data.no_surat),
                  });
                },
                onClose: () => {
                  setFields([]);
                  setInitialData({});
                },
              }}
              form={{
                mutation: PutSurat,
                queryKey: ["surats"],
              }}
            />
            <UploadForm
              title={`Form upload data ${initialData?.no_surat}`}
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
                getUrl: "/filesSurat",
                postUrl: "/uploadFileSurat",
                downloadUrl: "/downloadSurat",
                deleteUrl: "/deleteSurat",
              }}
            />
          </div>
        ),
      },
    ];

    return [...baseColumns, ...actionColumns];
  }, [SuratFields, initialData]);

  // DELETE SELECTION
  const { handleSelectedDeletion } = useSelectionDeletion({
    keyField: "ID",
    mutation: DeleteSurat,
    queryKey: ["surats"],
  });

  // LEFT SUB HEADER
  const renderSubHeader = (
    <div className="flex gap-2">
      <AddForm
        title={`Form tambah data Surat`}
        form={{
          mutation: PostSurat,
          queryKey: ["surats"],
          otherValue: { create_by: userDetails.username },
        }}
        event={{
          onOpen: () => {
            setFields(SuratFields);
            setInitialData({});
          },
          onClose: () => {
            setFields([]);
          },
        }}
      />
    </div>
  );

  // FILTER NOSURAT
  const { filteredData, renderFilter } = useFilter({
    data: Surats,
    filteredItem: "no_surat",
  });

  return (
    <App services="Surat">
      <div className="p-4">
        {isLoading ? (
          <TableLoading />
        ) : (
          <Table
            title="Data Surat"
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
