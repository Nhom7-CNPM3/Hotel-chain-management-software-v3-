"use server";

import AdminNavItems from "@/components/AdminNavItems";
import BillBody from "@/shared/Admin/BillBody";

import { cookies } from "next/headers";

const AdminBillScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");

    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <BillBody />
        </div>
      </>
    );
}

export default AdminBillScreen