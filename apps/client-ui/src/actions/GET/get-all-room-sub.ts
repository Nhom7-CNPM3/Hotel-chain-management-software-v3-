"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm lấy thông tin tất cả các phòng con
export default async function getAllRoomSubByUserId()  {
    const admin_id = cookies().get('user_id')?.value  // Lấy user_id từ cookies
    const role = cookies().get('role')?.value  // Lấy user_id từ cookies
    if(role === 'Admin'){
        const RoomSubQuery = await prisma.tbNhomKhuVucPhong.findMany({  // Tìm tất cả các phòng con từ bảng tbNhomKhuVucPhong
            select: {
                id: true,
                TenNhomKhuVuc: true,
                GhiChu: true,
            }
        })
        return RoomSubQuery;  // Trả về danh sách các phòng con
    }


}