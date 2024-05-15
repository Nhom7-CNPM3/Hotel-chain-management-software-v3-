import { cookies } from "next/headers"

export const StaffHomeScreen = () => {
  const cookieStore = cookies()
  const Staff_id = cookieStore.get('user_id')
  return (
    <div>StaffHomeScreen + {Staff_id?.value}</div>
  )
}
