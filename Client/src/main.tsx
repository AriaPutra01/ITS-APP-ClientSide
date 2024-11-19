import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Menit } from "@/lib/time";
import { TokenProvider } from "./hooks/useToken";
// AUTH
import { Login } from "@/features/Auth/pages/Login";
// USER
import User from "@/features/MainData/pages/User";
// WELCOME
import Welcome from "@/pages/Welcome";
import NotFound from "@/pages/Error/404";
// DASHBOARD
import Dashboard from "@/pages/Dashboard";
// DOKUMEN
import Memo from "@/features/MainData/pages/Dokumen/Memo";
import BeritaAcara from "@/features/MainData/pages/Dokumen/BeritaAcaraPage";
import Sk from "@/features/MainData/pages/Dokumen/SkPage";
import Surat from "@/features/MainData/pages/Dokumen/SuratPage";
import Perdin from "@/features/MainData/pages/Dokumen/PerjalananDinasPage";
// RENCANA KERJA
import Project from "@/features/MainData/pages/RencanaKerja/ProjectPage";
import { BaseProjectPage } from "@/features/MainData/pages/RencanaKerja/BaseProjectPage";
// KEGIATAN PROSES
import TimelineDesktop from "@/features/MainData/pages/KegiatanProses/TimelineDesktopPage";
import Meeting from "@/features/MainData/pages/KegiatanProses/MeetingPage";
import BookingRapat from "@/features/MainData/pages/KegiatanProses/BookingRapatPage";
import JadwalRapat from "@/features/MainData/pages/KegiatanProses/JadwalRapatPage";
import JadwalCuti from "@/features/MainData/pages/KegiatanProses/JadwalCutiPage";
// WEEKLY MEETING
import { TimelineProjectPage } from "@/features/MainData/pages/KegiatanProses/TimelineProjectPage";
import MeetingShcedule from "@/features/MainData/pages/KegiatanProses/MeetingListPage";
// DATA INFORMASI
import SuratMasuk from "@/features/MainData/pages/DataInformasi/SuratMasukPage";
import SuratKeluar from "@/features/MainData/pages/DataInformasi/SuratKeluarPage";
import Arsip from "@/features/MainData/pages/DataInformasi/ArsipPage";
//REQUEST
import Request from "@/features/MainData/pages/Request/requestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select: (data: any) => data?.data || [],
      refetchIntervalInBackground: true,
      staleTime: Menit(10),
    },
  },
});

const router = createBrowserRouter([
  // WELCOME
  {
    //* DONE
    path: "/",
    element: <Welcome />,
    errorElement: <NotFound />,
  },
  // AUTH
  {
    //* DONE
    path: "/login",
    element: <Login />,
  },
  // USER
  {
    //* DONE
    path: "/user",
    element: <User />,
  },
  // DASHBOARD
  {
    //* DONE
    path: "/dashboard",
    element: <Dashboard />,
  },
  // DOKUMEN
  {
    //* DONE
    path: "/memo",
    element: <Memo />,
  },
  {
    //* DONE
    path: "/berita-acara",
    element: <BeritaAcara />,
  },
  {
    //* DONE
    path: "/sk",
    element: <Sk />,
  },
  {
    //* DONE
    path: "/surat",
    element: <Surat />,
  },
  {
    //* DONE
    path: "/perjalanan-dinas",
    element: <Perdin />,
  },
  // RENCANA KERJA
  {
    //* DONE
    path: "/project",
    element: <Project />,
  },
  {
    //* DONE
    path: "/base-project",
    element: <BaseProjectPage />,
  },
  // KEGIATAN PROSES
  {
    //? PROGRESS
    path: "/timeline-desktop",
    element: <TimelineDesktop />,
  },
  {
    //* DONE
    path: "/booking-rapat",
    element: <BookingRapat />,
  },
  {
    //* DONE
    path: "/jadwal-rapat",
    element: <JadwalRapat />,
  },
  {
    //* DONE
    path: "/jadwal-cuti",
    element: <JadwalCuti />,
  },
  {
    //* DONE
    path: "/meeting",
    element: <Meeting />,
  },
  // WEEKLY MEETING
  {
    //TODO
    path: "/timeline-project",
    element: <TimelineProjectPage />,
  },
  {
    //* DONE
    path: "/meeting-schedule",
    element: <MeetingShcedule />,
  },
  // DATA & INFORMASI
  {
    //* DONE
    path: "/surat-masuk",
    element: <SuratMasuk />,
  },
  {
    //* DONE
    path: "/surat-keluar",
    element: <SuratKeluar />,
  },
  {
    //* DONE
    path: "/arsip",
    element: <Arsip />,
  },
  {
    //TODO
    path: "/request",
    element: <Request />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
