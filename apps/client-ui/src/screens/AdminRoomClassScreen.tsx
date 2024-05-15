"use server";

import AdminNavItems from "@/components/AdminNavItems";
import RoomBody from "@/shared/Admin/RoomBody";

import { cookies } from "next/headers";

const AdminRoomClassScreen = () => {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <RoomBody />
        </div>
      </>
    );
}

export default AdminRoomClassScreen