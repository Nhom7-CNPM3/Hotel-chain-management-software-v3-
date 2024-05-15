'use client'

import AdminDropDownItem from "@/lib/antd/AdminDropDownItemGroup/AdminDropDownItem"
import AdminDropDownItem1 from "@/lib/antd/AdminDropDownItemGroup/AdminDropDownItem1"
import AdminDropDownItem2 from "@/lib/antd/AdminDropDownItemGroup/AdminDropDownItem2"
import AdminDropDownItem3 from "@/lib/antd/AdminDropDownItemGroup/AdminDropDownItem3"
import AdminDropDownItem4 from "@/lib/antd/AdminDropDownItemGroup/AdminDropDownItem4"

const AdminDropDownItemComponent = () => {
  return (
    <div className="my-5 flex flex-col gap-6">
    <AdminDropDownItem />
    <AdminDropDownItem1 />
    <AdminDropDownItem2 />
    <AdminDropDownItem3 />
    <AdminDropDownItem4 />
    </div>
  )
}

export default AdminDropDownItemComponent