"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem1 = () => {
  const router = useRouter();

  const handleNavigate2 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Goods");
  };

  const handleNavigate3 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/CheckInventory");
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleNavigate2}>Danh mục</button>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate3}>Kiểm kho</button>,
      key: "4",
    },
  ];

  return (
    <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button
            className="w-full py-2 rounded-xl hover:bg-blue-600"
            onClick={(e) => e.preventDefault()}
          >
            <Space>Hàng hóa</Space>
          </button>
        </Dropdown>
    </>
  );
};

export default AdminDropDownItem1;
