"use client";

import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { MdAdd } from "react-icons/md";
import { FaFileImport, FaFileExport } from "react-icons/fa6";

const items: MenuProps["items"] = [
  {
    label: "+ Hàng hóa",
    key: "Product",
  },
  {
    label: "+ Dịch vụ",
    key: "Service",
  },
];

const AdminAddGoodsButtons: any = ({
  setOpen,
}: {
  setOpen: (e: string) => void;
}) => {
  const onClick: MenuProps["onClick"] = ({ key }) => {
    setOpen(key);
  };

  return (
    <div>
      <Space>
        <Dropdown menu={{ items, onClick }}>
          <button
            className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              <MdAdd className="size-5" />
              Thêm mới
              <DownOutlined />
            </Space>
          </button>
        </Dropdown>

        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            <FaFileImport className="size-5" />
            Import
          </Space>
        </button>

        <button
          className=" bg-green-500 rounded-lg font-bold py-2 px-6 hover:bg-green-300 hover:text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            <FaFileExport className="size-5" />
            Export
          </Space>
        </button>
      </Space>
    </div>
  );
};

export default AdminAddGoodsButtons;
