"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";
import AdminAddCashBookReadyCashButtonsComponent from "./Buttons/CashBook/AdminAddCashBookReadyCashButtonsComponent";
import AdminAddCashBookReadyCashTableComponent from "./Tables/CashBook/AdminAddCashBookReadyCashTableComponent";
import AdminAddCashBookGeneralFundButtonsComponent from "./Buttons/CashBook/AdminAddCashBookGeneralFundButtonsComponent";
import AdminAddCashBookGeneralFundTableComponent from "./Tables/CashBook/AdminAddCashBookGeneralFundTableComponent";

const AdminCashBookBodyContentComponents = () => {
  const [cashBookRow, setCashBookRow] = useState("ReadyCash");
  return (
    <>
      <div className="w-full pt-5 pl-5 mt-20 z-0">
        <ButtonGroup>
          <Button 
            radius="sm"
            className="bg-gray-400 text-slate-700 font-bold"
           onClick={() => setCashBookRow("ReadyCash")}
           >
            Tiền mặt
            </Button>
          <Button 
          radius="sm"
          className="bg-gray-400 text-slate-700 font-bold"
          onClick={() => setCashBookRow("GeneralFund")}
          >
            Tổng quỹ
          </Button>
        </ButtonGroup>
      </div>

      {cashBookRow === "ReadyCash" ? (
        <>
          {/* Ready Money */}
          <div className="px-10 mt-8 mb-9 z-0 flex justify-between w-full">
            <h2 className="text-gray-700 font-semibold text-xl">Sổ quỹ tiền mặt</h2>
            <AdminAddCashBookReadyCashButtonsComponent />
          </div>
          <div className="px-10 mt-8 mb-9 z-0 flex justify-between w-full">
            <AdminAddCashBookReadyCashTableComponent />
          </div>
        </>
      ) : (
        <>
          {/* GeneralFund */}
          <div className="px-10 mt-8 mb-9 z-0 flex justify-between w-full">
            <h2 className="text-gray-700 font-semibold text-xl">Tổng quỹ</h2>
            <AdminAddCashBookGeneralFundButtonsComponent />
          </div>
          <div className="px-10 mt-8 mb-9 z-0 flex justify-between w-full">
            <AdminAddCashBookGeneralFundTableComponent />
          </div>
        </>
      )}
    </>
  );
};

export default AdminCashBookBodyContentComponents;
