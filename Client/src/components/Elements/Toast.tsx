import Swal from "sweetalert2";

export const TimerToast = (
  icon: "error" | "success" | "info" | "warning" | "question",
  title: string,
  text?: string,
  timer: number = 1500
) =>
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer,
  });

export const Toast = (
  icon: "error" | "success" | "info" | "warning" | "question",
  title: string,
  text?: string
) =>
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });

export const ConfirmToast = (
  icon: "error" | "success" | "info" | "warning" | "question",
  title: string,
  text?: string
) =>
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
