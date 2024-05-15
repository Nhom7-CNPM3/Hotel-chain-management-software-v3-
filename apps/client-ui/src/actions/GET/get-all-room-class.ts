"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các loại phòng
export default async function getAllRoomClass() {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies

    // Lấy tất cả các loại phòng từ bảng tbLoaiPhong
    const allRoomClassQuery = await prisma.tbLoaiPhong.findMany({
        select: {
            id: true,
            TenLoaiPhong: true, 
            GiaTheoGio: true,  
            GiaTheoNgay: true, 
        }
    })

    return allRoomClassQuery;  // Trả về danh sách các loại phòng
}