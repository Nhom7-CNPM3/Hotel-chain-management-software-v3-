"use server";  // Sử dụng server mode

import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers';

export default async function getAllHangHoaTableView() {
    const admin_id = cookies().get('user_id')?.value 
    const khach_san = cookies().get('khach_san')?.value 

        const allLoaiHangHoaTableViewQuery = await prisma.tbNhomHangHoa.findMany({
            where: {
             MaKhachSan: khach_san
            },
            select: {
                TenNhomHangHoa: true,
                HangHoa: {
                    select: {
                        id: true,
                        TenHangHoa: true,
                        GiaBanHangHoa: true,
                        GiaGocHangHoa: true,
                        SLTonKho: true,
                    }
                }
            }
        })

        return allLoaiHangHoaTableViewQuery;

}