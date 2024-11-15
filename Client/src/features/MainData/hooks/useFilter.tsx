import React from "react";
import { FilterComponent } from "@/features/MainData/components/Sections/Table/Filter";

interface Props {
  data: any;
  filteredItem: string;
}

export const useFilter = ({ data, filteredItem }: Props) => {
  const [filterText, setFilterText] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data?.filter(
      (item: any) =>
        item[filteredItem] &&
        item[filteredItem].toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  const renderFilter = React.useMemo(() => {
    return (
      <FilterComponent
        filteredData={filteredItem}
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return { filteredData, renderFilter };
};
