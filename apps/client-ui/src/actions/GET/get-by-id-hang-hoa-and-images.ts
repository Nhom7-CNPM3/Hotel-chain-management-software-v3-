'use server'

import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin khách sạn dựa trên tên
export default async function getByIdHangHoaAndImages(idHangHoa: string) {

    const HangHoaAndImageQuery = await prisma.tbHangHoa.findFirst({
        where: {
          id: idHangHoa,
        },
        select: {
          id: true,
          MaNhomHangHoa: true,
          TenHangHoa: true,
          DonViTinh: true,
          SLTonKho: true,
          GiaGocHangHoa: true,
          GiaBanHangHoa: true,
          DinhMucTonItNhat: true,
          TrongLuong: true,
          MoTa: true,
          GhiChu: true,
          ViTri: true,
          CacLinkAnhHangHoa: {
            select: {
                LinkAnh: true
            }
          }

        }
      });

    return HangHoaAndImageQuery;
}