import { Events } from "@/config/types";
import dayjs from "@/lib/dayjs";

// Fungsi untuk memeriksa acara yang akan datang
export default function checkUpcomingEvents(events: Events[]) {
  const now = dayjs();

  return events?.filter((event) => {
    const eventTime = dayjs(event.start); // Konversi waktu acara ke dayjs object
    const diffInHours = eventTime.diff(now, "days"); // Hitung selisih dalam jam

    // Kriteria notifikasi: 1 hari (24 jam) atau 1 jam sebelum acara
    return diffInHours <= 24 && diffInHours > 0;
  });
}
