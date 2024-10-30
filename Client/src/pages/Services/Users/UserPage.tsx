import React from "react";
import App from "@/Layouts/App";
import { ReusableTable } from "../../../components/Fragments/Services/ReusableTable";
import { useToken } from "../../../context/TokenContext";
import { getUsers } from "../../../../API/Users/Users.service";
export const UserPage = () => {
  const [formConfig, setFormConfig] = React.useState({
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
  });

  const { userDetails } = useToken(); // Ambil token dari context
  let userEmail = "";
  let userName = "";
  let userRole = "";
  if (userDetails) {
    userName = userDetails.name;
    userEmail = userDetails.email;
    userRole = userDetails.role;
  }

  return (
    <App services={formConfig.services}>
      <div className="overflow-auto">
        {/* Table */}
        <ReusableTable
          formConfig={formConfig}
          setFormConfig={setFormConfig}
          get={getUsers}
          CustomHandleAdd={() => {
            window.location.href = "/add-user";
          }}
          InfoColumn={false}
        />
        {/* End Table */}
      </div>
    </App>
  );
};
