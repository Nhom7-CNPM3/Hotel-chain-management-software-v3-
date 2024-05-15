'use client'

import React from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineSearch } from "react-icons/md";
import { Radio } from 'antd';

const ReceptionistHomeBody = () => {
  return (
    <>
    {/* Top Body */}
    <div className="pt-16 flex justify-between">

      {/* Left Group */}
      <div>
      <ButtonGroup>
      <Button className="bg-green-600">
        <div className="w-full flex justify-between gap-4">
          <TfiMenuAlt className='size-5 font-bold' />
          <span className="text-sm font-bold">Lưới</span>
        </div>
      </Button>

      <Button className="bg-white">
        <CgMenuGridR className='size-5 text-gray-700' />
        </Button>

      <Button>
      <MdOutlineSearch className='size-5' />
        <span>Tìm kiếm</span>
      </Button>
    </ButtonGroup>
      </div>

      {/* Right Group */}
      <div>

        {/* Radio Group */}
        <div>
        <Radio.Group name="radiogroup">
    <Radio value={1}>Đặt trước</Radio>
    <Radio value={2}>Đang sử dụng</Radio>
    <Radio value={3}>Đã trả phòng</Radio>
  </Radio.Group>
        </div>

        {/* Buttons Group */}
        <div>
        </div>
      </div>
    </div>

    {/* Bottom Body */}
    <div></div>
    </>
  )
}

export default ReceptionistHomeBody