"use server";

import AdminNavItems from "@/components/AdminNavItems";
import PriceBookBody from "@/shared/Admin/PriceBookBody";

import { cookies } from "next/headers";

const AdminPriceBookScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <PriceBookBody />
        </div>
      </>
    );
}

export default AdminPriceBookScreen