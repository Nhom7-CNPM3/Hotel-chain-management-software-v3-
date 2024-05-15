"use client";

import AdminAddCashBookReadyCashButtons from "@/lib/antd/AdminAddCashBookReadyCashButtons";
import { useState } from "react";
import { MdClose } from "react-icons/md";

type OpenType = "PrepareReceipts" | "MakeAPaymentVoucher";

const AdminAddCashBookReadyCashButtonsComponent: React.FC = () => {
  const [open, setOpen] = useState<OpenType | "screen">("screen");
  return (
    <>
      <AdminAddCashBookReadyCashButtons setOpen={setOpen} />

      {open === "PrepareReceipts" && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-[400px] rounded-lg mx-16 -translate-y-28 shadow-lg flex flex-col gap-2">
            <div className="mt-4 mx-6 flex justify-between">
              <h3 className="text-gray-700 font-bold">Lập phiếu thu (tiền mặt)</h3>
              <button
              onClick={() => setOpen('screen')}
              >
              <MdClose className='text-gray-700 hover:text-red-600' />
              </button>
              </div>
              <div className=" h-full">
              <p className="text-black">Table</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {open === "MakeAPaymentVoucher" && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-white w-[800px] h-[400px] rounded-lg mx-16 -translate-y-28 shadow-lg">
              <div className="mt-4 mx-6 flex justify-between">
              <h3 className="text-gray-700 font-bold">Lập phiếu chi (tiền mặt)</h3>
              <button
              onClick={() => setOpen('screen')}
              >
              <MdClose className='text-gray-700 hover:text-red-600' />
              </button>
              </div>
              <div className="h-full">
                <p className="text-black">Table</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddCashBookReadyCashButtonsComponent;
