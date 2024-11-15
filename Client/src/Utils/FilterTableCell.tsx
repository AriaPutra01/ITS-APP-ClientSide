import { FormatDate } from "./FormatDate";

const FilterTableCell = (field: any, value: any) => {
  if (field.render) {
    return field.render(value);
  }
  switch (field.type) {
    case "number":
      return `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
    case "date":
      if (field.name === "bulan") {
        return value ? FormatDate(value, "bulanTahun") : "";
      }
      return value ? FormatDate(value) : "";
    default:
      return value;
  }
};

export default FilterTableCell;
