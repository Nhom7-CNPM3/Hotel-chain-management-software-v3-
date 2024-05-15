"use server";

import AdminHeader from '@/components/Layout/AdminHeader'
import PdfView from '@/lib/pdf-lib/ProductReport/PdfView';

const ProductReportBody = () => {
  return (
    <div className="basis-5/6">
    <AdminHeader />
    <div className="h-[90vh] mt-[80px]">
        <PdfView />
    </div>
  </div>
  )
}

export default ProductReportBody