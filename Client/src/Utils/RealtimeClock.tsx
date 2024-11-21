import dayjs from "@/lib/dayjs";

export function RealtimeDate() {
  return dayjs().format("dddd, DD MMMM YYYY");
}

export function RealtimeClock() {
  return dayjs().format("HH:mm:ss");
}
