'use server'

import AdminNavItems from "@/components/AdminNavItems";
import ProductReportBody from "@/shared/Admin/ProductReportBody";
import { cookies } from "next/headers";

const AdminProductReportScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
  return (
    <>
        <div className="w-full h-full flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <ProductReportBody />
        </div>
    </>
  )
}

export default AdminProductReportScreen