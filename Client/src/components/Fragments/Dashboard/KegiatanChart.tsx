import Card from "../../Elements/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const KegiatanChart = () => {
  const { data: GetTimelineDesktop, isLoading: LoadingDesktop } = useFetchData({
    queryKey: ["timelineDesktops"],
    axios: {
      url: "/timelineDesktop",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetBookingRapat, isLoading: LoadingBooking } = useFetchData({
    queryKey: ["bookingRapats"],
    axios: {
      url: "/booking-rapat",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetJadwalRapat, isLoading: loadingRapat } = useFetchData({
    queryKey: ["jadwalRapats"],
    axios: {
      url: "/jadwal-rapat",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetJadwalCuti, isLoading: loadingCuti } = useFetchData({
    queryKey: ["jadwalCutis"],
    axios: {
      url: "/jadwal-cuti",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetMeeting, isLoading: loadingMeeting } = useFetchData({
    queryKey: ["meetings"],
    axios: {
      url: "/meetings",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const Kegiatan = useMemo(
    () => [
      {
        label: "Timeline Desktop",
        color: "yellow",
        count: GetTimelineDesktop,
      },
      {
        label: "Booking Ruang Rapat",
        color: "yellow",
        count: GetBookingRapat,
      },
      {
        label: "Jadwal Rapat",
        color: "yellow",
        count: GetJadwalRapat,
      },
      {
        label: "Jadwal Cuti",
        color: "yellow",
        count: GetJadwalCuti,
      },
      {
        label: "Meeting",
        color: "yellow",
        count: GetMeeting,
      },
    ],
    [
      GetTimelineDesktop,
      GetBookingRapat,
      GetJadwalRapat,
      GetJadwalCuti,
      GetMeeting,
    ]
  );

  const isLoading =
    LoadingDesktop ||
    LoadingBooking ||
    loadingRapat ||
    loadingCuti ||
    loadingMeeting;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card className="grid grid-cols-5 gap-2" title="Kegiatan" color="yellow">
      {Kegiatan.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
