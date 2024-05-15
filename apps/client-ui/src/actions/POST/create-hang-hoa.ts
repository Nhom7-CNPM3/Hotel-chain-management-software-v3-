"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

// Hàm tạo mới một phòng
export default async function createHangHoa(HangHoaData: any) {

        // Tìm kiếm bản ghi trong bảng tbPhong dựa trên TenPhong từ RoomData
        const HangHoaExit = await prisma.tbHangHoa.findFirst({
            where: {
                id: HangHoaData.id,
            },
            select: {
                id: true,
            }
        });

        const HangHoaNameAnđonViTinhExit = await prisma.tbHangHoa.findFirst({
            where: {
                TenHangHoa: HangHoaData.TenHangHoa,
                DonViTinh: HangHoaData.DonViTinh
            },
            select: {
                id: true,
            }
        });

        

        // Nếu HangHoaData.CacLinkAnhPhong không tồn tại, ném một lỗi yêu cầu bổ sung ít nhất 1 bức ảnh
        if(!HangHoaData.CacLinkAnhHangHoa){
            throw new Error('Vui lòng bổ sung ít nhất 1 bức ảnh!');
        }



        // Nếu HangHoaData tồn tại, ném một lỗi cho biết tên phòng đã tồn tại
        if (HangHoaExit) {
            throw new Error('Mã hàng hóa này đã tồn tại!');
        } else if(HangHoaNameAnđonViTinhExit) {
            throw new Error('Tên hàng hóa và đơn vị đã tồn tại!');
        } else {
                // Tạo một bản ghi mới trong tbPhong với thông tin từ RoomData
                const room = await prisma.tbHangHoa.create({
                    data: {
                        id: HangHoaData?.id,
                        TenHangHoa: HangHoaData.TenHangHoa,
                        MaNhomHangHoa: HangHoaData.MaNhomHangHoa,
                        DonViTinh: HangHoaData.DonViTinh,
                        GiaGocHangHoa: HangHoaData.GiaGocHangHoa,
                        GiaBanHangHoa: HangHoaData.GiaBanHangHoa,
                        // TrongLuong: HangHoaData?.TrongLuong,
                        SLTonKho: HangHoaData.SLTonKho,
                        DinhMucTonItNhat: HangHoaData.DinhMucTonItNhat,
                        DinhMucTonNhieuNhat: HangHoaData.DinhMucTonNhieuNhat,
                        ViTri: HangHoaData.ViTri,
                        MoTa: HangHoaData?.MoTa,
                        GhiChu: HangHoaData?.GhiChu,
                        CacLinkAnhHangHoa: {
                            create: HangHoaData.CacLinkAnhHangHoa.map((link: string) => ({
                                LinkAnh: link,
                            })),
                        }
                    }
                });
        }
}