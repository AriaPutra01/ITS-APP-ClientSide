import App from "@/components/Layouts/App";
import { Calendar } from "../../components/Sections/Calendar/Calendar";
import { useDeleteData, useFetchData, usePostData } from "../../hooks/useAPI";
import { Events } from "@/config/types";
import { useToken } from "@/hooks/useToken";
import { Excel } from "@/Utils/Excel";
import { Button } from "@/components/ui/button";
import { id } from "date-fns/locale/id";
import { format } from "date-fns";
import clsx from "clsx";
import { useState } from "react";

export default function TimeLineDesktop() {
  const {
    userDetails: { role },
  } = useToken();

  // EVENTS
  const { data: Events } = useFetchData({
    queryKey: ["timelineDesktop"],
    axios: {
      url: "/timelineDesktop",
    },
    select: ({ data }: any) =>
      data.filter((data: Events) => data.resourceId === resourceId),
  });
  const Post = usePostData({
    axios: {
      url: "/timelineDesktop",
    },
  });
  const Del = useDeleteData({
    axios: {
      url: "/timelineDesktop",
    },
  });

  // RESOURCES
  const [resourceId, setResourceId] = useState(0);

  const { data: Resources } = useFetchData({
    queryKey: ["resourceDesktops"],
    axios: {
      url: "/resourceDesktop",
    },
  });

  const subLeftBar = (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      {/* HEADER */}
      <span className="flex justify-between items-center gap-2 h-[3rem] pb-2 border-b-4">
        <Button className="font-bold bg-sky-500 h-full w-full rounded py-1 px-2 text-white">
          {(Resources as any)?.length} Resource
        </Button>
        {role === "admin" && (
          <Excel link={{ exportThis: "exportTimelineDesktop" }} />
        )}
      </span>
      {/* LIST */}
      <div
        className={clsx(
          { "pe-0": (Resources as any)?.length === 0 },
          `flex flex-col gap-2 h-[69vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pe-2`
        )}>
        <Button className="font-bold bg-blue-600 hover:bg-blue-700 h-[2rem] w-full rounded py-1 px-2 text-white">
          Tambah Resource
        </Button>
        {(Resources as any)?.length === 0 ? (
          <div className="ring-2 ring-blue-200 rounded m-2 p-1">
            <p>
              Belum ada Resources yang tersedia, tambahkan resources baru di
              sini.
            </p>
          </div>
        ) : (
          (Resources as any)?.map((event: any, idx: number) => {
            return (
              <div
                key={idx}
                className={clsx(
                  { "bg-gray-600 text-white": event.id === resourceId },
                  "text-gray-800 ring-2 ring-slate-200 shadow py-2 px-3 rounded hover:-translate-y-1 transition-all"
                )}>
                <div
                  className="font-bold "
                  onClick={() => {
                    if (resourceId) {
                      setResourceId(0);
                    } else {
                      setResourceId(event.id);
                    }
                  }}>
                  {event.name}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <App services="TimeLine Wallpaper Desktop">
      <Calendar
        initialView="dayGridMonth"
        data={Events as Events[]}
        mutation={{
          post: Post,
          otherValue: {
            // TAMBAH RESOURCE ID
            resourceId,
          },
          del: Del,
          invalidateKey: ["timelineDesktop"],
        }}
        subLeftBar={subLeftBar}
      />
    </App>
  );
}
