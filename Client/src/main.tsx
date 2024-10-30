import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Auth
import { TokenProvider } from "@/context/TokenContext";
import { LoginPage } from "@/pages/Auth/LoginPage";
import { RegisterPage } from "@/pages/Auth/RegisterPage";
// User
import { UserPage } from "@/pages/Services/Users/UserPage";
// Welcome
import { WelcomePage } from "@/pages/Welcome/Welcome";
// Dashboard
import ErrorPage from "@/pages/Error/404";
import { DashboardPage } from "@/pages/Dashboard/Dashboard";
// Dokumen
import { MemoPage } from "@/pages/Services/Dokumen/MemoPage";
import { BeritaAcaraPage } from "@/pages/Services/Dokumen/BeritaAcaraPage";
import { SkPage } from "@/pages/Services/Dokumen/SkPage";
import { SuratPage } from "@/pages/Services/Dokumen/SuratPage";
import { PerdinPage } from "@/pages/Services/Dokumen/PerjalananDinasPage";
// Rencana Kerja
import { ProjectPage } from "@/pages/Services/RencanaKerja/ProjectPage";
import { BaseProjectPage } from "@/pages/Services/RencanaKerja/BaseProjectPage";
// Kegiatan Proses
import { TimelineProjectPage } from "@/pages/Services/KegiatanProses/TimelineProjectPage";
import { TimelineDesktopPage } from "@/pages/Services/KegiatanProses/TimelineDesktopPage";
import { MeetingPage } from "@/pages/Services/KegiatanProses/MeetingPage";
import { MeetingListPage } from "@/pages/Services/KegiatanProses/MeetingListPage";
import { BookingRapatPage } from "@/pages/Services/KegiatanProses/BookingRapatPage";
import { JadwalRapatPage } from "@/pages/Services/KegiatanProses/JadwalRapatPage";
import { JadwalCutiPage } from "@/pages/Services/KegiatanProses/JadwalCutiPage";
// Data Informasi
import { SuratMasukPage } from "@/pages/Services/DataInformasi/SuratMasukPage";
import { SuratKeluarPage } from "@/pages/Services/DataInformasi/SuratKeluarPage";
import { ArsipPage } from "@/pages/Services/DataInformasi/ArsipPage";
//request
import { RequestPage } from "@/pages/Services/Request/requestPage";
import axios from "axios";
import { IsLogin } from "./context/middleware";
axios.defaults.withCredentials = true; // Izinkan pengiriman cookie

const router = createBrowserRouter([
  // welcome
  { path: "/", element: <WelcomePage />, errorElement: <ErrorPage /> },
  // auth
  { path: "/login", element: <LoginPage /> },
  {
    path: "/add-user",
    element: (
      <IsLogin>
        <RegisterPage />
      </IsLogin>
    ),
  },
  //user
  {
    path: "/user",
    element: (
      <IsLogin>
        <UserPage />
      </IsLogin>
    ),
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      <IsLogin>
        <DashboardPage />
      </IsLogin>
    ),
  },
  // Dokumen
  {
    path: "/memo",
    element: (
      <IsLogin>
        <MemoPage />
      </IsLogin>
    ),
  },
  {
    path: "/berita-acara",
    element: (
      <IsLogin>
        <BeritaAcaraPage />
      </IsLogin>
    ),
  },
  {
    path: "/sk",
    element: (
      <IsLogin>
        <SkPage />
      </IsLogin>
    ),
  },
  {
    path: "/surat",
    element: (
      <IsLogin>
        <SuratPage />
      </IsLogin>
    ),
  },
  {
    path: "/perjalanan-dinas",
    element: (
      <IsLogin>
        <PerdinPage />
      </IsLogin>
    ),
  },
  // Rencana Kerja
  {
    path: "/project",
    element: (
      <IsLogin>
        <ProjectPage />
      </IsLogin>
    ),
  },
  {
    path: "/base-project",
    element: (
      <IsLogin>
        <BaseProjectPage />
      </IsLogin>
    ),
  },
  // Kegiatan Proses
  {
    path: "/timeline-project",
    element: (
      <IsLogin>
        <TimelineProjectPage />
      </IsLogin>
    ),
  },
  {
    path: "/timeline-desktop",
    element: (
      <IsLogin>
        <TimelineDesktopPage />
      </IsLogin>
    ),
  },
  {
    path: "/booking-rapat",
    element: (
      <IsLogin>
        <BookingRapatPage />
      </IsLogin>
    ),
  },
  {
    path: "/jadwal-rapat",
    element: (
      <IsLogin>
        <JadwalRapatPage />
      </IsLogin>
    ),
  },
  {
    path: "/jadwal-cuti",
    element: (
      <IsLogin>
        <JadwalCutiPage />
      </IsLogin>
    ),
  },
  {
    path: "/meeting",
    element: (
      <IsLogin>
        <MeetingPage />
      </IsLogin>
    ),
  },
  {
    path: "/meeting-schedule",
    element: (
      <IsLogin>
        <MeetingListPage />
      </IsLogin>
    ),
  },
  // Data Informasi
  {
    path: "/surat-masuk",
    element: (
      <IsLogin>
        <SuratMasukPage />
      </IsLogin>
    ),
  },
  {
    path: "/surat-keluar",
    element: (
      <IsLogin>
        <SuratKeluarPage />
      </IsLogin>
    ),
  },
  {
    path: "/arsip",
    element: (
      <IsLogin>
        <ArsipPage />
      </IsLogin>
    ),
  },
  {
    path: "/request",
    element: <RequestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);
