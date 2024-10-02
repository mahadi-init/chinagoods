import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Request } from "@/https/request";
import { SellerType } from "@/types/seller.t";
import { TAGS } from "@/types/tags";
import { getDaysAgo } from "@/utils/get-days-ago";

export default async function PaymentHistory({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data: SellerType = await new Request().get(
    `/seller/single/${searchParams.id}`,
    [TAGS.HISTORY],
  );

  if (data?.payments && data.payments?.length <= 0) {
    return (
      <p className="mt-16 text-center text-lg font-bold text-red-500">
        No records found
      </p>
    );
  }

  return (
    <div>
      <p className="text-center text-2xl font-bold">Payment History</p>

      <Table className="my-8">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Delivery Point</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payments &&
            data?.payments.reverse().map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium text-purple-600">
                  {getDaysAgo(item.lastPaymentDate)!! <= 0
                    ? "Today"
                    : getDaysAgo(item.lastPaymentDate) + " days ago"}
                </TableCell>
                <TableCell className="font-medium text-green-600">
                  {item.lastPaymentAmount}
                </TableCell>
                <TableCell className="font-medium">
                  {item.monthlyDeliveredAtThatPoint}
                </TableCell>
                <TableCell className="font-medium">{item.note}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
