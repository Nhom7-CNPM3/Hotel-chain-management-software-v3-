"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng
export default async function deleteHangHoa(HangHoaId: string) {

        // Tìm kiếm bản ghi trong bảng tbPhong dựa trên TenPhong từ RoomData
        const HangHoaExit = await prisma.tbChiTietNoiDungNhap.findFirst({
            where: {
                MaHangHoa: HangHoaId,
            },
            select: {
                id: true,
            }
        });


        // Nếu HangHoaData tồn tại, ném một lỗi cho biết tên phòng đã tồn tại
        if (HangHoaExit) {
            throw new Error('Mã hàng hóa này đã tồn tại trong chi tiết phiếu nhập!');
        } else {

            const deletedHangHoaInfo = await prisma.tbHangHoa.findUnique({
                where: {
                    id: HangHoaId,
                },
                select: {
                    TenHangHoa: true,
                },
            });

                // Xóa hàng hóa

                await prisma.tbCacLinkAnhHangHoa.deleteMany({
                    where: {
                        MaHangHoa: HangHoaId,
                    },
                });

                const deletedHangHoa = await prisma.tbHangHoa.delete({
                    where: {
                        id: HangHoaId,
                    },
                });

                return { deletedHangHoa, TenHangHoa: deletedHangHoaInfo?.TenHangHoa };
        }

        
}