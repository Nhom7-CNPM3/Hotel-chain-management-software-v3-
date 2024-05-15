import AdminGoodsViewTableScreen from "@/screens/Goods/AdminGoodsViewTableScreen";

export default function Page({ params }: { params: { id: string } }) {
    return (
      <>
          <AdminGoodsViewTableScreen
            idHangHoa = {params.id}
           />
      </>
    )
  }