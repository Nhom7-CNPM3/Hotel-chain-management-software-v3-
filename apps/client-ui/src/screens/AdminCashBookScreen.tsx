
import AdminNavItems from "@/components/AdminNavItems"
import CashBookBody from "@/shared/Admin/CashBookBody"
import { cookies } from "next/headers";

const AdminCashBookScreen = () => {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
        <div className="w-full h-full flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <CashBookBody />
        </div>
    </>
  )
}

export default AdminCashBookScreen