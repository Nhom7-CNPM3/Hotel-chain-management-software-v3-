"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem = () => {
  const router = useRouter();

  const handleNavigate = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Home");
  };

  const handleNavigate1 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/RoomClass");
  };

  const handleNavigate2 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/PriceBook");
  };

  const handleNavigate4 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Employees");
  };

  const handleNavigate5 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/CashBook");
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleNavigate1}>Phòng/Hạng phòng</button>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate2}>Thiết lập giá</button>,
      key: "1",
    },
  ];

  return (
    <>
      <>
        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate}
        >
          <Space>Tổng quan</Space>
        </button>
      </>

      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button
            className="w-full py-2 rounded-xl hover:bg-blue-600"
            onClick={(e) => e.preventDefault()}
          >
            <Space>Hạng phòng/Phòng</Space>
          </button>
        </Dropdown>
      </>

      <>
        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate4}
        >
          <Space>Nhân viên</Space>
        </button>
      </>

      <>
        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate5}
        >
          <Space>Sổ quỹ</Space>
        </button>
      </>
    </>
  );
};

export default AdminDropDownItem;
