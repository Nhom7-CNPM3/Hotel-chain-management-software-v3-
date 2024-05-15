'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react'
import { EditIcon } from './EditIcon'
import { DeleteIcon } from './DeleteIcon'
import { EyeIcon } from './EyeIcon'

interface Employees {
  id: number
  name: string
  address: string
  phone_number: number
  email: string
  role: string
  [key: string]: any // Add index signature
}


const columns = [
  { name: 'Mã nhân viên', uid: 'id' },
  { name: 'Tên nhân viên', uid: 'name' },
  { name: 'Số điện thoại', uid: 'phone_number' },
  { name: 'Địa chỉ', uid: 'address' },
  { name: 'Vai trò', uid: 'role' },
  { name: 'ACTIONS', uid: 'actions' },
]


export { columns }

export default function AdminRoomTable() {
  const [employees, setEmployees] = React.useState([
    {
      id: 1,
      name: 'Thường',
      phone_number: 344323425,
      address: 'Cdâdadadada', 
      email: 'namnhatvt0000@gmail.com',
      role: 'LeTan',
    },
    {
        id: 2,
        name: 'Thường2',
        phone_number: 3443234252,
        address: 'Cdâdadadada', 
        email: 'namnhatvt0001@gmail.com',
        role: 'LeTan',
      },
  ])
  const renderCell: (employees: Employees, columnKey: string) => React.ReactNode = React.useCallback((employees: Employees, columnKey: string) => {
    const cellValue = employees[columnKey]

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{employees.id}</p>
          </div>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{employees.name}</p>
          </div>
        );
        case 'phone_number':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{employees.phone_number}</p>
            </div>
          );
          case 'email':
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">{employees.email}</p>
              </div>
            );
          case 'address':
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
                <p className="text-bold text-sm capitalize text-default-400">{employees.address}</p>
              </div>
            );
            case 'role':
                return (
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                    <p className="text-bold text-sm capitalize text-default-400">{employees.role}</p>
                  </div>
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
      <TableBody items={employees}>
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
