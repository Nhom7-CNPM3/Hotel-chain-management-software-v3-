'use server'

import TestingEmployeeForm from "@/Testing/Themes/TestingEmployeeForm"
import AdminAddEmployeesButtonsComponent from "@/components/Buttons/AdminEmployeesButtonsComponent"
import AdminHeader from "@/components/Layout/AdminHeader"
import AdminEmployeesTableComponent from "@/components/Tables/AdminEmployeesTableComponent"

const AdminEmployeesBody = () => {
    
  return (
    <div className="basis-5/6 bg-gray-200">
    <AdminHeader />
    <div className="h-auto">
      <div className="mx-10 mt-32 mb-9 z-0 flex justify-between">
        <h2 className="text-gray-700 font-semibold text-xl">
          Nhân viên
        </h2>
        <AdminAddEmployeesButtonsComponent />
      </div>
      <div className="w-full grid place-content-center">
        {/* <TestingEmployeeForm /> */}
        <AdminEmployeesTableComponent />
      </div>
    </div>
  </div>
  )
}

export default AdminEmployeesBody