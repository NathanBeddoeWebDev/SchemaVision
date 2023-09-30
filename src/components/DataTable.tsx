import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {cn} from "@/lib/utils.ts";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function DataTable() {
  const parentRef = useRef<HTMLDivElement>(null);
  const items = Array(100)
    .fill([...invoices])
    .flat();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => 20,
    overscan: 20,
  });

  return (
        <Table>
          <TableHeader className={"sticky top-0"}>
            <TableRow>
              <TableCell
                className={"p-1 border-r-2 pl-2 bg-slate-200 font-bold"}
              >
                invoice
              </TableCell>
              <TableCell
                className={"p-1 border-r-2 pl-2 bg-slate-200 font-bold"}
              >
                payment_status
              </TableCell>
              <TableCell
                className={"p-1 border-r-2 pl-2 bg-slate-200 font-bold"}
              >
                total_amount
              </TableCell>
              <TableCell
                className={"p-1 border-r-2 pl-2 bg-slate-200 font-bold"}
              >
                payment_method
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className={"overflow-auto max-h-32"}>
            {items.map((item, index) => (
              <TableRow className={"hover:bg-slate-100"} key={index}>
                <TableCell
                  className={cn("p-1 border-r-2 pl-2")}
                >
                  {item.invoice}
                </TableCell>
                <TableCell
                  className={cn("p-1 border-r-2 pl-2")}
                >
                  {item.paymentStatus}
                </TableCell>
                <TableCell
                  className={cn("p-1 border-r-2 pl-2")}
                >
                  {item.totalAmount}
                </TableCell>
                <TableCell
                  className={cn("p-1 border-r-2 pl-2")}
                >
                  {item.paymentMethod}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
}
