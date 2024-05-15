"use server";

import AdminNavItems from "@/components/AdminNavItems";
import AdminBodyHome from "@/components/Layout/AdminBodyHome";

import { cookies } from "next/headers";

export const AdminHomeScreen = () => {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-full bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminBodyHome />
      </div>
    </>
  );
};
