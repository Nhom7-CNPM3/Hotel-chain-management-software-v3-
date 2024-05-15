'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from '@nextui-org/react'
import { EditIcon } from './EditIcon'
import { DeleteIcon } from './DeleteIcon'
import { EyeIcon } from './EyeIcon'

interface Rooms {
  id: number
  TenPhong: string
  GiaTheoGio: number
  GiaTheoNgay: number
  ChiNhanh: string
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
  { name: 'Mã phòng', uid: 'id' },
  { name: 'Tên phòng', uid: 'TenPhong' },
  { name: 'Giá theo giờ', uid: 'GiaTheoGio' },
  { name: 'Giá theo ngày', uid: 'GiaTheoNgay' },
  { name: 'Chi Nhánh', uid: 'ChiNhanh' },
  { name: 'Trạng thái', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]


export { columns }

export default function AdminRoomTable() {
  const [rooms, setRooms] = React.useState([
    {
      id: 1,
      TenPhong: 'Thường',
      GiaTheoGio: 150000,
      GiaTheoNgay: 2000000,
      ChiNhanh: 'Chi Nhánh Trung Tâm', 
      status: 'Active',
    },
    {
      id: 2,
      TenPhong: 'Vip',
      GiaTheoGio: 50000,
      GiaTheoNgay: 1400000,
      ChiNhanh: 'Chi Nhánh Trung Tâm', 
      status: 'Paused',
    },
  ])
  const renderCell: (rooms: Rooms, columnKey: string) => React.ReactNode = React.useCallback((rooms: Rooms, columnKey: string) => {
    const cellValue = rooms[columnKey]

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{rooms.id}</p>
          </div>
        );
      case 'TenPhong':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{rooms.TenPhong}</p>
          </div>
        );
        case 'GiaTheoGio':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{rooms.GiaTheoGio}</p>
            </div>
          );
          case 'GiaTheoNgay':
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">{rooms.GiaTheoNgay}</p>
              </div>
            );
            case 'ChiNhanh':
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">{cellValue}</p>
                  <p className="text-bold text-sm capitalize text-default-400">{rooms.ChiNhanh}</p>
                </div>
              );
            case "status":
              return (
              <Chip className="capitalize" color={statusColorMap[rooms.status as keyof typeof statusColorMap]} size="sm" variant="flat">
              {cellValue}
              </Chip>
              );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Chi tiết">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </button>
            </Tooltip>
            <Tooltip content="Sửa phòng">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Xóa phòng">
              <button className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label="Example table with custom cells" className="light">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rooms}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, String(columnKey))}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
