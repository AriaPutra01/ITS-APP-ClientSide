import React, { useCallback } from "react";
import Modal from "@/components/Elements/Modal";
import FullCalendar from "@fullcalendar/react";
import { id } from "date-fns/locale/id";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import clsx from "clsx";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useFormStore } from "@/features/MainData/store/FormStore";
import { useModalStore } from "@/features/MainData/store/ModalStore";
import { CloseButton } from "../Table/Actions/Buttons";
import { CalendarFields } from "@/config/FormConfig/calendar";
import { ConfirmToast, TimerToast, Toast } from "@/components/Elements/Toast";
import { CalendarForm } from "./Form/CalendarForm";
import { Events } from "@/config/types";

interface CalendarProps {
  initialView: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listMonth";
  data: Events[];
  mutation: {
    post: UseMutationResult<unknown, Error, void, unknown>;
    otherValue?: any;
    del: UseMutationResult<unknown, Error, void, unknown>;
    invalidateKey: string[];
  };
  subLeftBar?: React.ReactNode;
}

export const Calendar = ({
  initialView,
  data,
  mutation,
  subLeftBar,
}: CalendarProps) => {
  const {
    modals: { addModal },
    openModal,
    closeModal,
  } = useModalStore();

  // INITIAL DATA
  const { initialData, setInitialData, setFields } = useFormStore();

  // Handle date click to add new event
  const handleDateClick = (selected: any) => {
    openModal("addModal");
    setFields(CalendarFields as any);
    setInitialData({
      title: "",
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
      color: "#4285f4",
    });
  };

  const queryClient = useQueryClient();

  // HANDLE ADD EVENT
  const handleSubmit = useCallback(
    async (values: any) => {
      const newEvent = {
        title: values.title,
        start: initialData.start,
        end: initialData.end,
        allDay: initialData.allDay,
        color: values.color,
      };
      await mutation?.post
        .mutateAsync({ ...newEvent, ...mutation.otherValue } as any, {
          onSuccess: ({ data }: any) => {
            // VALIDASI BENTROK UNTUK BOOKING RAPAT
            if (data.status === "pending") {
              Toast(
                "info",
                "Perhatian!",
                "Jadwal ini akan dipending karena bentrok dengan jadwal lain."
              );
            } else {
              TimerToast("success", "Event berhasil ditambahkan!");
            }
          },
          onError: ({ response }: any) => {
            TimerToast(
              "error",
              "Event gagal ditambahkan!",
              response.data.message
            );
          },
        })
        .then(() => closeModal("addModal"))
        .then(() =>
          queryClient.invalidateQueries({
            queryKey: mutation?.invalidateKey,
          })
        )
        .then(() => mutation?.post.reset());
    },
    [mutation?.post, initialData]
  );

  // HANDLE DELETE
  const handleEventClick = useCallback(
    (selected: any) => {
      ConfirmToast(
        "warning",
        "Apakah Anda yakin?",
        `Anda akan menghapus event ${selected.event.title} ?`
      ).then(async (result) => {
        if (result.isConfirmed) {
          await mutation?.del
            ?.mutateAsync(selected.event.id, {
              onSuccess: ({ data }: any) => {
                TimerToast("success", "Event berhasil dihapus!", data.message);
              },
              onError: ({ response }: any) => {
                TimerToast(
                  "error",
                  "Event gagal dihapus!",
                  response.data.message
                );
              },
            })
            .then(() =>
              queryClient.invalidateQueries({
                queryKey: mutation?.invalidateKey,
              })
            )
            .then(() => mutation?.del.reset());
        }
      });
    },
    [mutation?.del, queryClient, ConfirmToast]
  );

  return (
    <div
      className={clsx("grid grid-cols-2fr p-3", {
        "grid-cols-1fr": !subLeftBar,
      })}>
      {subLeftBar && (
        <div className="bg-gray-50 rounded h-[85vh] max-h-[85vh] w-[200px] overflow-auto p-4">
          {subLeftBar}
        </div>
      )}
      <div className="mx-3 overflow-auto h-[85vh] max-h-[85vh]">
        <FullCalendar
          height={"100%"}
          locale={id}
          titleFormat={{
            year: "numeric",
            day: "numeric",
            month: "long",
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay,listMonth,exportExcel",
          }}
          buttonText={{
            today: "Hari Ini",
            month: "Bulan",
            week: "Minggu",
            day: "Hari",
            list: "Agenda",
          }}
          initialView={initialView}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={data || []}
          select={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      <Modal
        isOpen={addModal}
        trigger={{
          onClose: (
            <CloseButton
              onClick={() => {
                closeModal("addModal");
                setFields([]);
                setInitialData({});
              }}
            />
          ),
        }}>
        <Modal.Title>Tambah Event</Modal.Title>
        <Modal.Content>
          {/* FORM */}
          <CalendarForm onSubmit={handleSubmit} />
          {/* END FORM */}
        </Modal.Content>
      </Modal>
    </div>
  );
};
