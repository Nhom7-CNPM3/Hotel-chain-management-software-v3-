"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng
export default async function createRoom(RoomData: any) {

        // Tìm kiếm bản ghi trong bảng tbPhong dựa trên TenPhong từ RoomData
        const roomNameExit = await prisma.tbPhong.findFirst({
            where: {
                TenPhong: RoomData.TenPhong,
            },
            select: {
                id: true,
            }
        });

        // Nếu RoomData.CacLinkAnhPhong không tồn tại, ném một lỗi yêu cầu bổ sung ít nhất 1 bức ảnh
        if(!RoomData.CacLinkAnhPhong){
            throw new Error('Vui lòng bổ sung ít nhất 1 bức ảnh!');
        }

        // Nếu roomNameExit tồn tại, ném một lỗi cho biết tên phòng đã tồn tại
        if (roomNameExit) {
            throw new Error('Tên phòng này đã tồn tại!');
        } else {
                // Tạo một bản ghi mới trong tbPhong với thông tin từ RoomData
                const room = await prisma.tbPhong.create({
                    data: {
                        TenPhong: RoomData.TenPhong,
                        MaNhomKhuVucPhong: RoomData.MaNhomKhuVucPhong,
                        MaLoaiPhong: RoomData.MaLoaiPhong,
                        GhiChu: RoomData?.GhiChu,
                        CacLinkAnhPhong: {
                            create: RoomData.CacLinkAnhPhong.map((link: string) => ({
                                LinkAnh: link,
                            })),
                        }
                    }
                });
        }
}