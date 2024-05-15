'use server'

import AdminNavItems from "@/components/AdminNavItems";
import PurchaseOrderBody from "@/shared/Admin/PurchaseOrderBody";
import { cookies } from "next/headers";

const AdminPurchaseOrderScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
  return (
    <>
        <div className="w-full h-full flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <PurchaseOrderBody />
        </div>
    </>
  )
}

export default AdminPurchaseOrderScreen