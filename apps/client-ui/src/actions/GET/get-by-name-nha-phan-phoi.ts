'use server'

import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin khách sạn dựa trên tên
export async function getByNameNhaCungCap(value: string) {

    return await prisma.tbNhaCungCap.findFirst({
        where: {
          TenNhaCungCap: value,
        },
        select: {
          id: true,
        }
      });

}