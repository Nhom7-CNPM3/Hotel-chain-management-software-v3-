'use server'

import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin khách sạn dựa trên tên
export async function getByNameRoomHotel(roomHotelName: any) {

    const UserChiNhanNameAndKhachSanNameQuery = await prisma.tbKhachSan.findFirst({
        where: {
          TenKhachSan: roomHotelName,
        },
        select: {
          id: true,
        }
      });

    return UserChiNhanNameAndKhachSanNameQuery;
}