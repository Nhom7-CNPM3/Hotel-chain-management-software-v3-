"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getByNameRoomSub(roomSubName: any) {

    const UserChiNhanNameAndKhachSanNameQuery = await prisma.tbNhomKhuVucPhong.findFirst({
        where: {
          TenNhomKhuVuc: roomSubName,
        },
        select: {
          id: true,
        }
      });

    return UserChiNhanNameAndKhachSanNameQuery;  // Trả về thông tin phòng con
}