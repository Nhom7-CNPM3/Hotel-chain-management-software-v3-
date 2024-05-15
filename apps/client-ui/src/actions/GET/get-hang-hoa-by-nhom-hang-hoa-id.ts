"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

export default async function getHangHoaByNhomHangHoaId(idNhomHangHoa: string) {
    
    const HangHoaQuery = await prisma.tbHangHoa.findMany({
        where: {
          MaNhomHangHoa: idNhomHangHoa,
        },
        select: {
          id: true,
          TenHangHoa: true,
          GiaGocHangHoa: true,
          DonViTinh: true,
          SLTonKho: true,
        }
      });

    return HangHoaQuery;

}