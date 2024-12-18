import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Button, Dropdown, FileInput } from "flowbite-react";
import useAxios from "@/config/axios";

type ExcelProps = {
  linkExportThis: string;
  linkUpdateThis: string;
  importExcel: string;
};

export function Excel({
  linkExportThis,
  linkUpdateThis,
  importExcel,
}: ExcelProps) {
  const axiosInstance = useAxios();

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const UpdateThis = async () => {
    const result = await Swal.fire({
      icon: "info",
      title: "Update Sheet Ini",
      text: "Anda akan mengupdate sheet ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      try {
        await axiosInstance.get(`/${linkUpdateThis}`);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil diupdate ke Excel",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Gagal!", "Error saat update data:", "error");
      }
    }
  };

  const exportAll = async () => {
    try {
      const response = await axiosInstance.get("/exportAll", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_sheets.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      Swal.fire("Gagal!", "Error saat mengekspor data:", "error");
    }
  };

  const handleImport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Mohon Untuk Menambahkan File.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = async () => {
      try {
        let fileExtension = "";
        const fileName: any = file.name;
        if (file.name) {
          fileExtension = fileName.split(".").pop().toLowerCase();
        } else {
          fileExtension = "";
        }
        if (fileExtension !== "xlsx") {
          throw new Error("File format harus berupa .xlsx");
        }
        const formData = new FormData();
        formData.append("file", file);
        await axiosInstance.post(`/${importExcel}`, formData, {
          // Pastikan importExcel digunakan di sini
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil diimport",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error saat mengimport data:", error); // Tambahkan log error ini
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Mohon untuk memasukkan file.xlsx",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
  };

  return (
    <div className="flex gap-1.5 items-center justify-center">
      <Dropdown color="success" label="Excel" dismissOnClick={false}>
        <Dropdown.Item className="flex gap-2 justify-between">
          {linkExportThis && (
            <Dropdown color="info" label="EXPORT" dismissOnClick={false}>
              <Dropdown.Item>
                <a href={`http://localhost:8080/${linkExportThis}`}>
                  This Sheet
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={exportAll}>All Sheets</a>{" "}
                {/* Panggil fungsi exportAll */}
              </Dropdown.Item>
            </Dropdown>
          )}
          {linkUpdateThis && (
            <Dropdown color="warning" label="UPDATE" dismissOnClick={false}>
              <Dropdown.Item>
                <a onClick={UpdateThis}>This Sheet</a>
              </Dropdown.Item>
            </Dropdown>
          )}
        </Dropdown.Item>
        {importExcel && (
          <Dropdown.Item className="flex flex-col gap-2">
            <FileInput onChange={handleFileChange} />
            <Button
              onClick={
                handleImport as unknown as React.MouseEventHandler<HTMLButtonElement>
              }
              color="success"
              className="w-full">
              Import
            </Button>
          </Dropdown.Item>
        )}
      </Dropdown>
    </div>
  );
}
