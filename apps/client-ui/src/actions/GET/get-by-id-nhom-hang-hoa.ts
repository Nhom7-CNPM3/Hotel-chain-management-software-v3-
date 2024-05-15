'use server'

import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin khách sạn dựa trên tên
export default async function getByIdNhomHangHoa(idNhomHangHoa: string) {

    const NhomHangHoaQuery = await prisma.tbNhomHangHoa.findFirst({
        where: {
          id: idNhomHangHoa,
        },
        select: {
          id: true,
          TenNhomHangHoa: true,

        }
      });

      if(!NhomHangHoaQuery){
        throw new Error("Error 500, File Contains No Data");
        
      }

    return NhomHangHoaQuery;
}