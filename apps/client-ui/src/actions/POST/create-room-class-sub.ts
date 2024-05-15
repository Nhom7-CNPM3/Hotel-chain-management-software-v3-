"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng học
export const createRoomClassSub = async (RoomClassSubData: any) => {
    const admin_id = cookies().get('user_id')?.value
    const khach_san = cookies().get('khach_san_id')?.value
    // Tìm kiếm bản ghi trong bảng tbNhomKhuVucPhong dựa trên TenNhomKhuVuc từ RoomClassSubData
    const roomClassSubIdExit = await prisma.tbNhomKhuVucPhong.findFirst({
        where: {
            TenNhomKhuVuc: RoomClassSubData.TenNhomKhuVuc,
        },
        select: {
            TenNhomKhuVuc: true,
        }
    });


    // Nếu bản ghi tồn tại, ném một lỗi với thông điệp chứa TenNhomKhuVuc của bản ghi đó
    if (roomClassSubIdExit) {
        throw new Error(`Khu vực ${roomClassSubIdExit.TenNhomKhuVuc} đã tồn tại rồi!`);
    } else {
        // Nếu bản ghi không tồn tại, tạo một bản ghi mới trong tbNhomKhuVucPhong với thông tin từ RoomClassSubData
        const roomClassSub = await prisma.tbNhomKhuVucPhong.create({
            data: {
                MaKhachSan: khach_san!,
                TenNhomKhuVuc: RoomClassSubData.TenNhomKhuVuc,
                GhiChu: RoomClassSubData.GhiChu,
            }
        });
    }
}