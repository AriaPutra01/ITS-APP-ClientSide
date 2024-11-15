import React, { useState } from "react";
import App from "@/components/Layouts/App";
import { ReusableTable } from "../../../../components/Fragments/Services/ReusableTable";
import { jwtDecode } from "jwt-decode";
import {
  addBeritaAcara,
  deleteBeritaAcara,
  getBeritaAcaras,
  updateBeritaAcara,
  getBeritaAcaraShow,
} from "../../../../../API/Dokumen/BeritaAcara.service";
import { Modal } from "flowbite-react";
import { FormatDate } from "../../../../Utils/FormatDate";
import { useToken } from "../../hooks/useToken";

export function BeritaAcaraPage() {
  const [formConfig, setFormConfig] = useState({
    fields: [
      { name: "tanggal", label: "Tanggal", type: "date", required: false },
      {
        name: "no_surat",
        label: "Nomor Surat",
        type: "select",
        options: ["ITS-SAG", "ITS-ISO"], // Hanya kategori
        required: false,
      },
      { name: "perihal", label: "Perihal", type: "text", required: false },
      { name: "pic", label: "Pic", type: "text", required: false },
    ],
    services: "Berita Acara",
  });
  const { token } = useToken(); // Ambil token dari context
  let userRole = "";
  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role;
  }

  const [selectedBeritaAcara, setSelectedBeritaAcara] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = async (id) => {
    try {
      const beritaAcara = await getBeritaAcaraShow(id);
      setSelectedBeritaAcara(beritaAcara);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching berita acara:", error);
    }
  };

  return (
    <App services={formConfig.services}>
      <div className="overflow-auto">
        {/* Table */}
        <ReusableTable
          formConfig={formConfig}
          setFormConfig={setFormConfig}
          get={getBeritaAcaras}
          set={addBeritaAcara}
          update={updateBeritaAcara}
          remove={deleteBeritaAcara}
          excel={{
            exportThis: "exportBeritaAcara",
            import: "uploadBeritaAcara",
          }}
          InfoColumn={true}
          UploadArsip={{
            get: "filesBeritaAcara",
            upload: "uploadFileBeritaAcara",
            download: "downloadBeritaAcara",
            delete: "deleteBeritaAcara",
          }}
          OnShow={handleShow} // Tambahkan prop onShow
          filterSagIso
        />
        {/* End Table */}
      </div>
      {/* Show Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Berita Acara</Modal.Header>
        <Modal.Body>
          {selectedBeritaAcara && (
            <div className="grid grid-cols-2 gap-4">
              <p className="font-semibold">Tanggal:</p>
              <p>{FormatDate(selectedBeritaAcara.tanggal)}</p>
              <p className="font-semibold">Nomor Surat:</p>
              <p>{selectedBeritaAcara.no_surat}</p>
              <p className="font-semibold">Perihal:</p>
              <p>{selectedBeritaAcara.perihal}</p>
              <p className="font-semibold">Pic:</p>
              <p>{selectedBeritaAcara.pic}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* End Show Modal */}
    </App>
  );
}
