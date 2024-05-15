"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem3 = () => {
  const router = useRouter();

  const handleNavigate3 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Customer");
  };

  const handleNavigate4 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Donors");
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleNavigate3}>Khách hàng</button>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleNavigate4}>Nhà tài trợ</button>,
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
            <Space>Đối tác</Space>
          </button>
        </Dropdown>
    </>
  );
};

export default AdminDropDownItem3;
