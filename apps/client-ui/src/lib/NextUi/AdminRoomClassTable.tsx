'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "./EyeIcon";

interface RoomsClass {
  id: number
  TenHangPhong: string
  GiaTheoGio: number
  GiaTheoNgay: number
  SLPhong: number
  status: string
  [key: string]: any // Add index signature
}

const statusColorMap: {
  [key: string]:
    | 'success'
    | 'danger'
    | 'warning'
    | 'default'
    | 'primary'
    | 'secondary'
    | undefined
} = {
  Active: 'success',
  Paused: 'danger',
  Vacation: 'warning',
  // Add a default color for other statuses
  // For example:
  // someOtherStatus: "default",
}

const columns = [
  {name: "Mã hạng phòng", uid: "id"},
  {name: "Tên hạng phòng", uid: "TenHangPhong"},
  {name: "Giá theo giờ", uid: "GiaTheoGio"},
  {name: "Giá theo ngày", uid: "GiaTheoNgay"},
  {name: "ACTIONS", uid: "actions"},
];

export {columns};


export default function AdminRoomClassTable({
  dataHangPhong
}: {
  dataHangPhong: any[]
}) {
  const renderCell: (dataHangPhong: any, columnKey: string) => React.ReactNode = React.useCallback((dataHangPhong: any, columnKey: string) => {
    const cellValue = dataHangPhong[columnKey];

    switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{dataHangPhong.id}</p>
            </div>
          );
        case 'TenHangPhong':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{dataHangPhong.TenHangPhong}</p>
            </div>
          );
          case 'GiaTheoGio':
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">{dataHangPhong.GiaTheoGio}</p>
              </div>
            );
            case 'GiaTheoNgay':
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">{cellValue}</p>
                  <p className="text-bold text-sm capitalize text-default-400">{dataHangPhong.GiaTheoNgay}</p>
                </div>
              );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Chi tiết">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </button>
            </Tooltip>
            <Tooltip content="Sửa hạng phòng">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Xóa hạng phòng">
              <button className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table 
    aria-label="Example table with custom cells"
    className="light"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={dataHangPhong}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, String(columnKey))}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
