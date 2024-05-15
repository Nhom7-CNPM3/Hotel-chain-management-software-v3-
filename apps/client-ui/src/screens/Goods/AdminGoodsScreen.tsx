"use server";

import AdminNavItems from "@/components/AdminNavItems";
import GoodsBody from "@/shared/Admin/GoodsBody";

import { cookies } from "next/headers";

const AdminGoodsScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");

    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <GoodsBody />
        </div>
      </>
    );
}

export default AdminGoodsScreen