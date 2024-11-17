import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GoProjectSymlink } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import Sidebar, {
  SidebarItem,
  SidebarCollapse,
} from "@/components/Elements/Sidebar";
import Header from "@/components/Elements/Header";
import { useToken } from "@/features/MainData/hooks/useToken";
import { MiddlewareProvider } from "@/lib/middleware";

const App = ({
  services,
  children,
}: {
  services: string | undefined;
  children: React.ReactNode;
}) => {
  const { token, userDetails } = useToken();

  // Logout user
  const handleSignOut = async () => {
    try {
      // Panggil endpoint logout
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Sertakan cookie dalam permintaan
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        await response.json();
        alert("Logout gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan logout");
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] h-full max-h-screen">
      {/* Sidebar */}
      <div className="max-h-screen overflow-y-auto">
        <Sidebar
          img="../../../public/images/logobjb.png"
          title="Divisi IT Security"
          username={userDetails.username}
          email={userDetails.email}>
          <SidebarItem
            href="/dashboard"
            text="Dashboard"
            icon={<MdOutlineDashboard />}
          />
          <SidebarCollapse
            text="Dokumen"
            icon={<HiOutlineClipboardDocumentList />}>
            <SidebarItem href="/memo" text="Memo" />
            <SidebarItem href={"/berita-acara"} text="Berita Acara" />
            <SidebarItem href="/surat" text="Surat" />
            <SidebarItem href="/sk" text="Sk" />
            <SidebarItem href="/perjalanan-dinas" text="Perjalanan Dinas" />
          </SidebarCollapse>
          <SidebarCollapse text="Project" icon={<GoProjectSymlink />}>
            <SidebarItem href="/project" text="Project" />
            <SidebarItem href="/base-project" text="Base Project" />
          </SidebarCollapse>
          <SidebarCollapse text="Kegiatan" icon={<GrPlan />}>
            <SidebarItem
              href="/timeline-desktop"
              text="Timeline Wallpaper Desktop"
            />
            <SidebarItem href="/booking-rapat" text="Booking Ruang Rapat" />
            <SidebarItem href="/jadwal-rapat" text="Jadwal Rapat" />
            <SidebarItem href="/jadwal-cuti" text="Jadwal Cuti" />
            <SidebarItem href="/meeting" text="Meeting" />
          </SidebarCollapse>
          <SidebarCollapse text="Weekly Timeline" icon={<GrPlan />}>
            <SidebarItem href="/timeline-project" text="Timeline Project" />
            <SidebarItem href="/meeting-schedule" text="Meeting Schedule" />
          </SidebarCollapse>
          <SidebarCollapse text="Informasi" icon={<SlEnvolopeLetter />}>
            <SidebarItem href="/surat-masuk" text="Surat Masuk" />
            <SidebarItem href="/surat-keluar" text="Surat Keluar" />
            <SidebarItem href="/arsip" text="Arsip" />
          </SidebarCollapse>
          {userDetails.role !== "user" && (
            <SidebarItem href="/user" text="User" icon={<FiUsers />} />
          )}

          {userDetails.role !== "user" && (
            <SidebarItem
              href="/request"
              text="Request"
              icon={<VscGitPullRequestGoToChanges />}
            />
          )}
          <SidebarItem
            onClick={handleSignOut}
            text="Logout"
            icon={<BiLogOut />}
          />
        </Sidebar>
      </div>
      {/* End Sidebar */}
      {/* Main */}
      <div className="grid grid-rows-[auto_1fr] h-screen overflow-y-auto">
        <Header title={services} />
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {/* MIDDLEWARE */}
          <MiddlewareProvider>{children}</MiddlewareProvider>
        </div>
      </div>
      {/* End Main */}
    </div>
  );
};
export default App;
