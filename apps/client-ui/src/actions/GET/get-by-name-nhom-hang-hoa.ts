'use server'

import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin khách sạn dựa trên tên
export async function getByNameNhomHangHotel(nhomHangHoaName: string) {

    const NhomHangHoaNameQuery = await prisma.tbNhomHangHoa.findFirst({
        where: {
          TenNhomHangHoa: nhomHangHoaName,
        },
        select: {
          id: true,
        }
      });

    return NhomHangHoaNameQuery;
}