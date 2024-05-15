
import AdminGoodsEditTableScreen from "@/screens/Goods/AdminGoodsEditTableScreen";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
        <AdminGoodsEditTableScreen
          idHangHoa = {params.id}
         />
    </>
  )
  }