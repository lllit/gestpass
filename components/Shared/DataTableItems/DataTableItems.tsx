import { columns } from "./colums";
import { DataTable } from "./data-table";
import { DataTableItemsProps } from "./DataTableItems.types";

export function DataTableItems(props: DataTableItemsProps) {
  const { elements } = props;
  return <div className="py-10">
    <DataTable columns={columns} data={elements}></DataTable>
  </div>;
}
