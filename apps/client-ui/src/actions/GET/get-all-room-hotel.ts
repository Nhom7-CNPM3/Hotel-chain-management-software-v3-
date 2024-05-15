"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export default async function getAllRoomHotel() {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies
    const role = cookies().get('role')?.value// Lấy user_id từ cookies

    if(role === 'Admin'){
    // Lấy tất cả các phòng khách sạn từ bảng tbKhachSan
    const allRoomHotelQuery = await prisma.tbKhachSan.findMany({
        select: {
            id: true, 
            TenKhachSan: true, 
        }
    })
    return allRoomHotelQuery;  // Trả về danh sách các phòng khách sạn
    }

}