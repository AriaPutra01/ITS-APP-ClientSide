import React from "react";
import App from "@/Layouts/App";
import Timeline from "../../../components/Fragments/Services/Calendar/TimelineCalendar";
import {
  addEventDesktop,
  deleteEventDesktop,
  getResources,
  addResource,
  deleteResource,
} from "../../../../API/KegiatanProses/TimelineDesktop.service";
import { Calendar } from "../../../components/Fragments/Services/Calendar/Calendar";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";

export const TimelineDesktopPage = () => {
  const [resources, setResources] = React.useState([]);
  const [resourceId, setResourceId] = React.useState(0);

  React.useEffect(() => {
    getResources((data) => {
      setResources(data);
    });
  }, []);

  const insertResource = async () => {
    const { value: name } = await Swal.fire({
      title: "Masukan Resource!",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Simpan",
      showLoaderOnConfirm: true,
      preConfirm: (e) => {
        return {
          name: e,
        };
      },
    });
    if (name) {
      try {
        const newResource = await addResource(name);
        setResources([...resources, newResource]);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Error saat menyimpan Resource: " + err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const getEvents = (callback) => {
    return axios
      .get("http://localhost:8080/timelineDesktop")
      .then((response) => {
        const data = response.data.events;
        const filter = data.filter((event) => {
          return event.resourceId === resourceId;
        });
        callback(filter);
      })
      .catch((error) => {
        throw new Error(`Gagal mengambil data. Alasan: ${error.message}`);
      });
  };
  const customToolbar = () => {
    return (
      <div className="bg-gray-50 p-[15px] rounded w-[200px] max-h-[85vh] overflow-auto">
        <h2 className="text-xl mt-0 mb-2 font-bold flex flex-col gap-[1rem] items-start">
          <span>{resources.length} Resources</span>
        </h2>
        <span>
          <Button
            className="ml-2 w-full mb-[1rem]"
            onClick={() => insertResource()}>
            Tambah
          </Button>
        </span>
        <div className="flex flex-col gap-2">
          {resources.length === 0 ? (
            <div className="ring-2 ring-blue-200 rounded p-2">
              <p>
                Belum ada resource yang tersedia, tambahkan resource baru di
                menu.
              </p>
            </div>
          ) : (
            resources.map((resource) => {
              return (
                <div
                  key={resource.id}
                  className={`${
                    resourceId === resource.id
                      ? "bg-gradient-to-br from-gray-200 to-gray-300 text-white"
                      : ""
                  } flex justify-between items-center overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 grow py-2 px-3 rounded`}>
                  <div
                    onClick={() => setResourceId(resource.id)}
                    className={`${
                      resourceId === resource.id
                        ? "text-blue-900 hover:text-blue-600"
                        : "text-gray-600 hover:text-black"
                    } font-bold  cursor-pointer  hover:scale-105 transition-all`}>
                    {resource.name}
                  </div>
                  <div
                    className="w-fit text-[red] hover:cursor-pointer hover:scale-105"
                    color="failure">
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <App services="Timeline Wallpaper Desktop">
      <Calendar
        view="dayGridMonth"
        get={getEvents}
        add={addEventDesktop}
        remove={deleteEventDesktop}
        excel={{
          exportThis: "exportTimelineDesktop",
        }}
        customLeftBar={customToolbar}
      />
    </App>
  );
};
