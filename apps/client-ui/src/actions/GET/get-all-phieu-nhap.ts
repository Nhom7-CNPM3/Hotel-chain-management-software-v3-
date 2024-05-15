"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các loại phòng
export default async function getAllPhieuNhap() {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies

    // Lấy tất cả các loại phòng từ bảng tbLoaiPhong
    return await prisma.tbPhieuNhap.findMany({
        select: {
            id: true,
            MaNhaCungCap: true,
            CacKhoanChiPhiPhatSinhHangHoa: true,
            TongTienCanTra: true,
            TienDaTra:true,
            Status: true,


        }
    })
}