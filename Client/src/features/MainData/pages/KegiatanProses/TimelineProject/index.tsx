import App from "@/components/Layouts/App";
import Timeline from "@/features/MainData/components/Sections/Calendar/TimelineCalendar";
import {
  useDeleteData,
  useFetchData,
  usePostData,
} from "@/features/MainData/hooks/useAPI";
import SubHeader from "./SubHeader";

export default function TimelineProject() {
  const { data: Events } = useFetchData({
    queryKey: ["timelineProjects"],
    axios: {
      url: "/timelineProject",
    },
  });

  const { data: Resources } = useFetchData({
    queryKey: ["resourceProjects"],
    axios: {
      url: "/resourceProject",
    },
  });

  return (
    <App services="Timeline Project">
      <Timeline
        events={Events}
        resources={Resources}
        mutation={{
          invalidateKey: {
            event: ["timelineProjects"],
            resource: ["resourceProjects"],
          },
          post: {
            event: usePostData({
              axios: {
                url: "/timelineProject",
              },
            }),
          },
          del: {
            event: useDeleteData({
              axios: {
                url: "/timelineProject",
              },
            }),
            resource: useDeleteData({
              axios: {
                url: "/resourceProject",
              },
            }),
          },
        }}
        leftCustomHeader={<SubHeader />}
      />
    </App>
  );
}
