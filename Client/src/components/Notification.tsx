import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { DEL } from "@/lib/actions";
import { GetAPI } from "@/lib/GetAPI";

// Define notification event type
interface NotificationEvent {
  id: string;
  category: string;
  title: string;
  start: string | Date;
}

type NotificationCategories =
  | "JadwalCuti"
  | "JadwalRapat"
  | "TimelineProject"
  | "TimelineWallpaperDesktop"
  | "BookingRapat";

// type NotificationState = Record<NotificationCategories, NotificationEvent[]>;
type NotificationState = {
  [key: string]: NotificationEvent[];
};

type FilterState = Record<NotificationCategories, boolean>;

export default function Notification() {
  const [notification, setNotification] = useState<NotificationState>({
    JadwalCuti: [],
    JadwalRapat: [],
    TimelineProject: [],
    TimelineWallpaperDesktop: [],
    BookingRapat: [],
  });

  const [filter, setFilter] = useState<FilterState>({
    JadwalCuti: false,
    JadwalRapat: true,
    BookingRapat: true,
    TimelineWallpaperDesktop: true,
    TimelineProject: true,
  });

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  // State untuk menyimpan waktu event
  const [eventTime, setEventTime] = useState<Date | null>(null);

  const eventTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    if (eventTime) {
      eventTimeRef.current = eventTime;
    }
  }, [eventTime]);

  useEffect(() => {
    const checkEventTime = () => {
      if (!eventTimeRef.current) return; // Add null check here

      const now = new Date();
      const oneHourBeforeEvent = new Date(
        eventTimeRef.current.getTime() - 60 * 60 * 1000
      );

      console.log("Waktu saat ini:", now); // Log waktu saat ini
      console.log("Satu jam sebelum event:", oneHourBeforeEvent); // Log waktu satu jam sebelum event

      if (now >= oneHourBeforeEvent && now <= eventTimeRef.current) {
        console.log("Menampilkan notifikasi untuk event."); // Log ketika kondisi untuk menampilkan notifikasi terpenuhi
        Swal.fire({
          title: "Pengingat Event",
          text: "Event Anda akan dimulai dalam satu jam!",
          icon: "info",
          confirmButtonText: "Baik",
        }).then((result) => {
          if (result.isConfirmed) {
            // Hapus notifikasi setelah konfirmasi
            setNotification((prevData) => {
              const updatedNotifications: any = { ...prevData };
              Object.keys(updatedNotifications).forEach((category) => {
                updatedNotifications[category] = updatedNotifications[
                  category
                ].filter((event: any) => event.start !== eventTimeRef.current);
              });
              return updatedNotifications;
            });
          }
        });
      } else {
        console.log("Notifikasi tidak ditampilkan."); // Log ketika notifikasi tidak ditampilkan
      }
    };

    const timer = setInterval(() => {
      checkEventTime();
    }, 60000); // Periksa setiap menit

    return () => {
      console.log("Membersihkan timer."); // Log ketika membersihkan timer
      clearInterval(timer);
    };
  }, []); // useEffect ini tidak memiliki dependensi dan hanya di-set sekali

  const handleFilterChange = (category: NotificationCategories) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [category]: !prevFilter[category],
    }));
  };

  // Fetch events dan set waktu event
  useEffect(() => {
    const fetchNotifications = () => {
      GetAPI("notifications", (data) => {
        const groupedNotifications: NotificationState = {
          JadwalCuti: [],
          JadwalRapat: [],
          BookingRapat: [],
          TimelineWallpaperDesktop: [],
          TimelineProject: [],
        };
        data.forEach((event: NotificationEvent) => {
          if (groupedNotifications[event.category]) {
            groupedNotifications[event.category].push(event);
          }
          // Misalnya, set waktu event untuk event pertama
          if (event.category === "JadwalRapat") {
            setEventTime(new Date(event.start)); // Asumsi 'start' adalah waktu mulai event
          }
        });
        setNotification(groupedNotifications);
      });
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 60000); // Refresh setiap 1 menit

    return () => clearInterval(intervalId);
  }, []);

  // Fungsi untuk menghapus notifikasi tunggal
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menghapus Notif ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DEL("notifications", id);
          setNotification((prevData) => {
            const updatedNotifications = { ...prevData };
            Object.keys(updatedNotifications).forEach((category) => {
              updatedNotifications[category as NotificationCategories] =
                updatedNotifications[category as NotificationCategories].filter(
                  (event) => event.id !== id
                );
            });
            return updatedNotifications;
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: `Error saat hapus notif!, ${error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  // Fungsi untuk menghandle perubahan pada checkbox
  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Fungsi untuk menghandle select all
  const handleSelectAll = (category: NotificationCategories) => {
    const allIds = notification[category].map((event) => event.id);
    setSelectedNotifications((prevSelected) =>
      allIds.every((id) => prevSelected.includes(id))
        ? prevSelected.filter((id) => !allIds.includes(id))
        : [
            ...prevSelected,
            ...allIds.filter((id) => !prevSelected.includes(id)),
          ]
    );
  };

  // Fungsi untuk menghapus notifikasi yang dipilih
  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedNotifications) {
        await DEL("notification", id);
      }
      setNotification((prevData) => {
        const updatedNotifications = { ...prevData };
        Object.keys(updatedNotifications).forEach((category) => {
          updatedNotifications[category as NotificationCategories] =
            updatedNotifications[category as NotificationCategories].filter(
              (event) => !selectedNotifications.includes(event.id)
            );
        });
        return updatedNotifications;
      });
      setSelectedNotifications([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Error saat hapus notif!, ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative flex items-center">
          {Object.values(notification).some(
            (category) => category.length > 0
          ) && (
            <div className="absolute -translate-x-[3px] rounded-full bg-green-400">
              <div className="w-full text-xs text-white px-[5px]">
                {Object.values(notification).reduce(
                  (total, category) => total + category.length,
                  0
                )}
              </div>
            </div>
          )}
          <svg
            className="w-[34px] h-[34px] text-slate-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M17.133 12.632v-1.8a5.406 5.406 0 0 1-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <h1 className="text-base">Notification</h1>
          <button onClick={handleDeleteSelected} className="text-red-600">
            Hapus yang Dipilih
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="p-2 grid grid-cols-2 gap-2">
            {Object.keys(filter).map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filter[category as NotificationCategories]}
                  onChange={() =>
                    handleFilterChange(category as NotificationCategories)
                  }
                  className="mr-2"
                />
                <label className="text-sm">{category}</label>
              </div>
            ))}
          </div>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <div className="max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {Object.keys(notification).every(
              (category) =>
                notification[category as NotificationCategories].length === 0
            ) && (
              <span className="text-sm text-gray-600">
                <Badge color="warning" className="m-3">
                  Tidak ada notifikasi
                </Badge>
              </span>
            )}
            {Object.entries(notification).map(([category, events]) =>
              events.length > 0 &&
              filter[category as NotificationCategories] ? (
                <div key={category}>
                  <DropdownMenuLabel>
                    <h1 className="p-2">{category}</h1>
                    <button
                      onClick={() =>
                        handleSelectAll(category as NotificationCategories)
                      }
                      className="text-blue-600">
                      Pilih Semua
                    </button>
                  </DropdownMenuLabel>
                  {events.map((event) => (
                    <DropdownMenuItem
                      key={event.id}
                      className="grid grid-cols-12 text-sm">
                      <div className="col-span-10">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(event.id)}
                          onChange={() => handleSelectNotification(event.id)}
                          className="mr-2"
                        />
                        <span className="font-medium">{event.title}</span>
                        <p className="text-xs text-gray-500">
                          {format(
                            new Date(event.start),
                            "EEEE, dd MMM yyyy - HH:mm",
                            {
                              locale: id,
                            }
                          )}
                        </p>
                      </div>
                      <div className="col-span-2 text-right">
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 text-xs">
                          Hapus
                        </button>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              ) : null
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
