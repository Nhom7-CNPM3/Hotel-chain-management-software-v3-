"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng học
export const createNhomHangHoa = async (NhomHangHoaData: any) => {
    const admin_id = cookies().get('user_id')?.value
    const khach_san = cookies().get('khach_san_id')?.value
    // Tìm kiếm bản ghi trong bảng tbNhomKhuVucPhong dựa trên TenNhomKhuVuc từ RoomClassSubData
    const NhomhangHoaIdExit = await prisma.tbNhomHangHoa.findFirst({
        where: {
            TenNhomHangHoa: NhomHangHoaData.TenNhomHangHoa,
        },
        select: {
            TenNhomHangHoa: true,
        }
    });


    // Nếu bản ghi tồn tại, ném một lỗi với thông điệp chứa TenNhomKhuVuc của bản ghi đó
    if (NhomhangHoaIdExit) {
        throw new Error(`Khu vực ${NhomhangHoaIdExit.TenNhomHangHoa} đã tồn tại rồi!`);
    } else {
        // Nếu bản ghi không tồn tại, tạo một bản ghi mới trong tbNhomKhuVucPhong với thông tin từ RoomClassSubData
        const nhomHangHoa = await prisma.tbNhomHangHoa.create({
            data: {
                MaKhachSan: khach_san!,
                TenNhomHangHoa: NhomHangHoaData.TenNhomHangHoa,
            }
        });
    }
}