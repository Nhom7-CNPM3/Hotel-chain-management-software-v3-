"use server";

import AdminNavItems from "@/components/AdminNavItems";
import AdminEmployeesBody from "@/shared/Admin/AdminEmployeesBody";

import { cookies } from "next/headers";

const AdminEmployeesScreen = () => {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <AdminEmployeesBody />
        </div>
      </>
    );
}

export default AdminEmployeesScreen