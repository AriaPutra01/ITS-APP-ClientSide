import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GoProjectSymlink } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useToken } from "../context/TokenContext";
import Sidebar, {
  SidebarItem,
  SidebarCollapse,
} from "@/components/Elements/Sidebar";
import Header from "@/components/Elements/Header";

const App = ({
  services,
  children,
}: {
  services: string;
  children: React.ReactNode;
}) => {
  const { token, userDetails } = useToken(); // Ambil token dari context

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
    <div className="grid grid-cols-2fr">
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
      <div className="grid grid-rows-2fr min-h-screen">
        <Header title={services} />
        <div className="mt-4 px-2 w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};
export default App;
