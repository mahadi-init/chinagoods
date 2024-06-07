import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteItem from "./DeleteItem";

type SimpleTableProps = {
  heads: string[];
  data?: { name: string; code: string }[];
  tag: string;
};

export function SimpleTable({ heads, data, tag }: SimpleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">INDEX</TableHead>
          {heads.map((head) => (
            <TableHead key={head} className="w-[100px]">
              {head}
            </TableHead>
          ))}

          <TableHead className="w-[100px]">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((datum, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{datum.name}</TableCell>
              <TableCell
                style={{
                  background: datum.code,
                }}
              >
                {datum.code}
              </TableCell>
              <TableCell className="font-medium">
                <DeleteItem
                  successMessage="Deleted Successfully"
                  validationTag="/extra"
                  queryUrl={`/extra/delete?${tag}=${datum.name}`}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
