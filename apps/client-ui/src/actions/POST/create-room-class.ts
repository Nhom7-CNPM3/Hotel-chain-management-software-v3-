"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';  // Import cookies từ 'next/headers'

export const createRoomClass = async (RoomClassData: any) => {
    const admin_id = cookies().get('user_id')?.value
    const khach_san = cookies().get('khach_san_id')?.value
    // Tìm kiếm bản ghi trong bảng tbLoaiPhong dựa trên id từ RoomClassData
    const roomClassIdExit = await prisma.tbLoaiPhong.findFirst({
        where: {
            id: RoomClassData.MaLoaiPhong,
        },
        select: {
            id: true,
        }
    });

    // Tìm kiếm bản ghi trong bảng tbLoaiPhong dựa trên TenLoaiPhong từ RoomClassData
    const roomClassNameExit = await prisma.tbLoaiPhong.findFirst({
        where: {
            TenLoaiPhong: RoomClassData.TenLoaiPhong,
        },
        select: {
            id: true,
        }
    });

    // Nếu RoomClassData.CacLinkAnh không tồn tại, ném một lỗi yêu cầu bổ sung ít nhất 1 bức ảnh
    if (!RoomClassData.CacLinkAnh) {
        throw new Error('Vui lòng bổ sung ít nhất 1 bức ảnh!');
    }

    // Nếu roomClassIdExit hoặc roomClassNameExit tồn tại, ném một lỗi cho biết hạng phòng đã tồn tại
    if (roomClassIdExit || roomClassNameExit) {
        throw new Error('Hạng phòng này đã tồn tại rồi!');
    } else {
        // Nếu MaLoaiPhong tồn tại trong RoomClassData
        if (RoomClassData.MaLoaiPhong) {
            // Tạo một bản ghi mới trong tbLoaiPhong với thông tin từ RoomClassData
            const roomClass = await prisma.tbLoaiPhong.create({
                data: {
                    id: RoomClassData.MaLoaiPhong,
                    MaKhachSan: khach_san!,
                    TenLoaiPhong: RoomClassData.TenLoaiPhong,
                    GiaTheoGio: RoomClassData.GiaTheoGio,
                    GiaTheoNgay: RoomClassData.GiaTheoNgay,
                }
            });

            // Tạo các bản ghi mới trong tbCacLinkAnhLoaiPhong dựa trên CacLinkAnh từ RoomClassData
            const roomClassImages = await Promise.all(RoomClassData.CacLinkAnh.map(async (link: string) => {
                return prisma.tbCacLinkAnhLoaiPhong.create({
                    data: {
                        MaLoaiPhong: roomClass.id,
                        LinkAnh: link,
                    }
                });
            }));

        } else {
            // Nếu MaLoaiPhong không tồn tại trong RoomClassData
            const roomClass = await prisma.tbLoaiPhong.create({
                data: {
                    TenLoaiPhong: RoomClassData.TenLoaiPhong,
                    MaKhachSan: khach_san!,
                    GiaTheoGio: RoomClassData.GiaTheoGio,
                    GiaTheoNgay: RoomClassData.GiaTheoNgay,
                    CacLinkAnhLoaiPhong: {
                        create: RoomClassData.CacLinkAnh.map((link: string) => ({
                            LinkAnh: link,
                        })),
                    }
                }
            });

            // Tìm kiếm bản ghi mới trong tbLoaiPhong dựa trên id từ roomClass
            const createdRoomClass = await prisma.tbLoaiPhong.findFirst({
                where: {
                    id: roomClass.id,
                },
            });

            // Nếu không tìm thấy bản ghi mới, ném một lỗi về quá trình tạo hạng phòng
            if (!createdRoomClass) {
                throw new Error('Có lỗi xảy ra trong quá trình tạo hạng phòng!');
            }
        }
    }
}