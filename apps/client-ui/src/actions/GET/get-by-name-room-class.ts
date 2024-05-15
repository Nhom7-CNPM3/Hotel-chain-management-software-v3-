"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng theo tên loại phòng
export async function getByNameRoomClassPrice(roomClassName: any) {


    const UserChiNhanNameAndKhachSanNameQuery = await prisma.tbLoaiPhong.findFirst({
        where: {
          TenLoaiPhong: roomClassName,
        },
        select: {
          id: true,  
          GiaTheoGio: true,  
          GiaTheoNgay: true,  
        }
      });

    return UserChiNhanNameAndKhachSanNameQuery;  // Trả về thông tin phòng
    // {id, GiaTheoGio, GiaTheoNgay}
}