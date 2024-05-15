"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem4 = () => {
  const router = useRouter();

  const handleNavigate1 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/DayReport");
  };

  const handleNavigate2 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/SaleReport");
  };

  const handleNavigate3 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/ProductReport");
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleNavigate1}>Cuối ngày</button>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate2}>Bán hàng</button>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate3}>Hàng hóa</button>,
      key: "11",
    },
  ];

  return (
    <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button
            className="w-full py-2 rounded-xl hover:bg-blue-600"
            onClick={(e) => e.preventDefault()}
          >
            <Space>Báo cáo</Space>
          </button>
        </Dropdown>
    </>
  );
};

export default AdminDropDownItem4;
