'use server'

import AdminNavItems from "@/components/AdminNavItems";
import AddNewPurchaseOrderBody from "@/shared/Admin/AddNewPurchaseOrderBody";
import { cookies } from "next/headers";

const AdminPurchaseOrderScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
  return (
    <>
        <div className="w-full h-full flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <AddNewPurchaseOrderBody />
        </div>
    </>
  )
}

export default AdminPurchaseOrderScreen