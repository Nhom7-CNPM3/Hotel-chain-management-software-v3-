"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  MdMessage,
  MdOutlineMenu,
  MdSettings,
  MdLocationOn,
  MdOutlineQueuePlayNext,
} from "react-icons/md";
import { Spin } from "antd";
import toast from "react-hot-toast";

function useNetwork(){
  const [isOnline, setNetwork] = React.useState(typeof window !== 'undefined' ? window.navigator.onLine : true);
  React.useEffect(() => {
      if (typeof window !== 'undefined') {
          window.addEventListener("offline", () => setNetwork(window.navigator.onLine));
          window.addEventListener("online", () => setNetwork(window.navigator.onLine));
      }
  });
  return isOnline;
}

const AdminHeaderRightInput = () => {
  const [loading, setLoading] = React.useState(false);

  const isOnline = useNetwork();

React.useEffect(()=>{
  if(!isOnline){
     console.log("Lost Connection");
  }
  
},[isOnline])

React.useEffect(()=>{
  
})

  const menuItems = [
    {
      label: "Giao diện lễ tân",
      path: "/LeTan/Home",
    },
    {
      label: "Giao diện phục vụ",
      path: "/PhucVu/Home",
    },
  ];

  const handleItemClick = (path: string) => {
    setLoading(true);
    window.open(path, "_blank");
    setLoading(false);
  };

  return (
    <>
      <div className="size-10 bg-white grid place-content-center rounded-md">
        <button className="size-full">
          <MdSettings className="size-6 text-gray-700" />
        </button>
      </div>
      <div className="size-10 bg-white grid place-content-center rounded-md">
        <button className="size-full">
          <MdLocationOn className="size-6 text-gray-700" />
        </button>
      </div>

      <div className="size-10 bg-white grid place-content-center rounded-md">
        <button className="size-full">
          <MdMessage className="size-6 text-gray-700" />
        </button>
      </div>
      {loading ? (
        <div className="ml-2">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <div className="ml-2">
          <Dropdown>
            <DropdownTrigger>
              <Button className="text-gray-700 bg-gray-200">
                <MdOutlineMenu className="size-8 hover:text-blue-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {menuItems.map((item, index) => (
                <DropdownItem key={index}>
                  <button
                    onClick={() => handleItemClick(item.path)}
                    className="w-full"
                  >
                    <div className="h-full flex justify-around align-middle text-center">
                      <p>{item.label}</p>
                      <div className="grid place-content-center">
                        <MdOutlineQueuePlayNext className="text-gray-50" />
                      </div>
                    </div>
                  </button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default AdminHeaderRightInput;
