'use client'

import AdminRoomClassTable from '@/lib/NextUi/AdminRoomClassTable'
import AdminRoomTable from '@/lib/NextUi/AdminRoomTable';
import { Button, ButtonGroup } from '@nextui-org/react'
import { useState } from 'react';


type TableRowTypeBtn = "RoomClass" | "Room"

const AdminRoomClassTableComponent = ({
  dataHangPhong,
  dataPhong
}: {
  dataHangPhong: any[]
  dataPhong: any[]
}) => {
  const [tableRowType, setTableRowType] = useState<TableRowTypeBtn>("RoomClass");

  return (
    <>
          <div className="w-full pb-3 pl-1 z-0">
        <ButtonGroup>
          <Button 
            radius="sm"
            className="bg-gray-400 text-slate-700 font-bold"
           onClick={() => setTableRowType("RoomClass")}
           >
            Hạng phòng
            </Button>
          <Button 
          radius="sm"
          className="bg-gray-400 text-slate-700 font-bold"
          onClick={() => setTableRowType("Room")}
          >
            Phòng
          </Button>
        </ButtonGroup>
      </div>

      {tableRowType === "RoomClass" ? (
        <AdminRoomClassTable
        dataHangPhong={dataHangPhong}
        />
      )  : (
        null
      )}

{tableRowType === "Room" ? (
        <AdminRoomTable
        // dataPhong={dataPhong}
         />
      )  : (
        null
      )}
    </>
  )
}

export default AdminRoomClassTableComponent