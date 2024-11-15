import Card from "../../Elements/Card";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/features/MainData/hooks/useAPI";

export const DataInformasiChart = () => {
  const { data: GetSuratMasuk, isLoading: LoadingMasuk } = useFetchData({
    queryKey: ["suratMasuks"],
    axios: {
      url: "SuratMasuk",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetSuratKeluar, isLoading: LoadingKeluar } = useFetchData({
    queryKey: ["suratKeluars"],
    axios: {
      url: "SuratKeluar",
    },
    select: (data) => (data as any)?.data.length || 0,
  });
  const { data: GetArsip, isLoading: loadingArsip } = useFetchData({
    queryKey: ["arsips"],

    axios: {
      url: "/Arsip",
    },
    select: (data) => (data as any)?.data.length || 0,
  });

  const DataInformasi = useMemo(
    () => [
      {
        label: "Surat Masuk",
        color: "red",
        count: GetSuratMasuk,
      },
      {
        label: "Surat Keluar",
        color: "red",
        count: GetSuratKeluar,
      },
      {
        label: "Arsip",
        color: "red",
        count: GetArsip,
      },
    ],
    [GetSuratMasuk, GetSuratKeluar, GetArsip]
  );

  const isLoading = LoadingMasuk || LoadingKeluar || loadingArsip;

  if (isLoading) {
    return <Skeleton className="size-full" />;
  }

  return (
    <Card
      className="grid grid-cols-3 gap-2"
      title="Data & Informasi"
      color="red">
      {DataInformasi.map((item, index) => (
        <Card.item key={index} color={item.color} label={item.label}>
          {item.count as any}
        </Card.item>
      ))}
    </Card>
  );
};
