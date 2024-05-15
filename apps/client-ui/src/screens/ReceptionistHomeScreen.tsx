'use server                                                                                                                                                                                                                                                                                                               '

import ReceptionistNavItem from "@/components/ReceptionistNavItem"
import ReceptionistHomeBody from "@/shared/Admin/ReceptionistHomeBody"
import { cookies } from "next/headers"

export const ReceptionistHomeScreen = () => {
  const cookieStore = cookies()
  const Admin_id = cookieStore.get('user_id')
  return (
    <div className="bg-gray-200 h-screen">
    <ReceptionistNavItem/>
    <ReceptionistHomeBody/>
    </div>
  )
}
