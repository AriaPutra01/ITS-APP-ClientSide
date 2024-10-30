import React, { useEffect, useState } from "react";
import App from "@/Layouts/App";
import { useToken } from "../../../context/TokenContext";
import { getUsers, deleteUser } from "../../../../API/Users/Users.service";
import Swal from "sweetalert2";
import Table from "@/components/Table/Table";
import FilterTableCell from "@/Utilities/FilterTableCell";
import { Button } from "@/components/ui/button";
import { TbEyeSearch } from "react-icons/tb";
import { FaUpload } from "react-icons/fa";

export const UserPage = () => {
  const Config = {
    fields: [
      { name: "Username", label: "Username", type: "text", required: true },
      { name: "Email", label: "Email", type: "text", required: true },
      {
        name: "Role",
        label: "Role",
        type: "select",
        options: ["user", "admin"],
        required: true,
      },
    ],
    services: "Users",
  };

  const { userDetails } = useToken(); // Ambil token dari context
  let userRole = "";
  if (userDetails) {
    userRole = userDetails.role;
  }

  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    getUsers((data: any) => {
      // ambil dari API
      setMainData(data || []);
    });
  }, []);

  const header = Config.fields.map((field) => {
    return {
      name: field.label,
      selector: (row: any) => FilterTableCell(field, row[field.name]),
      sortable: true,
    };
  });

  const columns = [
    ...header,
    {
      name: "Action",
      cell: (data: any) => (
        <div className="flex gap-1">
          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500"
            // onClick={() => handleEdit(data)}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </Button>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            // onClick={() => handleShowClick(data.ID)}
          >
            <TbEyeSearch size={20} />
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            // onClick={() => handleDelete(data.ID)}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            // onClick={() => {
            //   setSelectedId(data.ID);
            //   setIsModalOpen(true);
            // }}
          >
            <FaUpload />
          </Button>
        </div>
      ),
    },
  ];

  const CustomHeader = <div>ppp</div>;

  // Function untuk hapus multi select checkbox
  const handleBulkDelete = async (row: any) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menghapus data yang dipilih!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(row.map((data: any) => deleteUser(data.ID)));
          Swal.fire({
            icon: "info",
            title: "Berhasil!",
            text: "Data berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire("Gagal!", "Error saat hapus data:", "error");
        }
      }
    });
  };

  return (
    <App services={Config.services}>
      <Table
        title={Config.services}
        columns={columns}
        data={mainData}
        CustomHeader={CustomHeader}
        SelectedRows={{
          title: "Hapus Data Dipilih",
          variant: "destructive",
          action: handleBulkDelete,
        }}
      />
    </App>
  );
};
