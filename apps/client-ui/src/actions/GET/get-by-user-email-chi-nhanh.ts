"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin Chi Nhánh và Khách Sạn dựa trên email người dùng
export default async function getByUserEmailChiNhanh (userEmail: any) {

    const getByUserEmailChiNhanhQuery = await prisma.user.findFirst({
        where: {
          email: userEmail.UserEmail,
        },
        select: {
          id: true,  
          email: true,  
          role: true,  
          ChiNhanh: {
            select: {
              id: true,  
              KhachSan: {
                select: {
                  id: true,
                },
              }
            },
          }
        }
      });

    return getByUserEmailChiNhanhQuery;  // Trả về thông tin Chi Nhánh và Khách Sạn
}