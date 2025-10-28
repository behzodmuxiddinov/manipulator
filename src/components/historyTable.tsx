import { THistory } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";


export const HistoryTable= ({history}: {history: THistory[]}) => {
  return (
    <Table sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Первоначальный заказ</TableCell>
          <TableCell>Оптимизированный</TableCell>
          <TableCell>Дата/Время</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((item: any, idx: number) => (
          <TableRow key={idx}>
            <TableCell>{item.original}</TableCell>
            <TableCell>{item.optimized}</TableCell>
            <TableCell>
                {dayjs(item.datetime).format("YYYY-MM-DD HH:mm:ss")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

