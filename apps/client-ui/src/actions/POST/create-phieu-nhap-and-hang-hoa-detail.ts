"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng học
export const createPhiepNhap = async (data: any) => {
    const admin_id = cookies().get('user_id')?.value
    const khach_san = cookies().get('khach_san_id')?.value
    // Tìm kiếm bản ghi trong bảng tbNhomKhuVucPhong dựa trên TenNhomKhuVuc từ RoomClassSubData
    const IdExit = await prisma.tbPhieuNhap.findFirst({
        where: {
            id: data.id,
        },
        select: {
            id: true,
        }
    });


    // Nếu bản ghi tồn tại, ném một lỗi với thông điệp chứa TenNhomKhuVuc của bản ghi đó
    if (IdExit) {
        throw new Error(`Mã phiếu nhập đã tồn tại rồi!`);
    } else {
        // Nếu bản ghi không tồn tại, tạo một bản ghi mới trong tbNhomKhuVucPhong với thông tin từ RoomClassSubData
             const createPhieuNhapQuery = await prisma.tbPhieuNhap.create({
            data: {
                id: data.id,
                MaKhachSan: khach_san!,
                MaNhaCungCap: data.MaNhaCungCap,
                TongTienCanTra: data.TongTienCanTra,
                TienDaTra: data.TienDaTra,
                Status: data.Status,                
            }
        });

        if (createPhieuNhapQuery) {
            await Promise.all(data.ChiTietNoiDungNhap.map(async (item: any) => {
                await prisma.tbChiTietNoiDungNhap.create({
                    data: {
                        MaPhieuNhap: createPhieuNhapQuery.id,
                        MaHangHoa: item.id,
                        ThanhTien: item.ThanhTien,
                        SLNhap: Number(item.slTon)
                    }
                });
        
                await prisma.tbHangHoa.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        SLTonKho: Number(item.slTon) + Number(item.SLTonKho)
                    },
                });
            }));
        }

    }
}