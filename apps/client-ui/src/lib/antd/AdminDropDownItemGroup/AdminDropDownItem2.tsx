"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem2 = () => {
  const router = useRouter();

  const handleNavigate2 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Bill");
  };

  const handleNavigate3 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/ImportGoods");
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleNavigate2}>Hóa đơn</button>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate3}>Nhập hàng</button>,
      key: "1",
    },
  ];


  return (
    <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button
            className="w-full py-2 rounded-xl hover:bg-blue-600"
            onClick={(e) => e.preventDefault()}
          >
            <Space>Giao dịch</Space>
          </button>
        </Dropdown>
    </>
  );
};

export default AdminDropDownItem2;
