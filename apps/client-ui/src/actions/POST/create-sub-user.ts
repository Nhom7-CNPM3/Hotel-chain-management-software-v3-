"use server";  // Sử dụng server mode

import { SubUserDataType } from "@/types/sub-user";
import prisma from "../../lib/prismaDb";  // Import module prisma từ đường dẫn ../lib/prismaDb
import { cookies } from 'next/headers'
import * as bcrypt from "bcrypt"


export default async function createSubUser(SubUserData: SubUserDataType){
  const admin_id = cookies().get('user_id')?.value 
  const khach_san_id = cookies().get('khach_san_id')?.value 

    const subUserExitEmail = await prisma.subUser.findUnique({
        where: {
            email: SubUserData.email,
          },
    })
    const UserExitEmail = await prisma.user.findUnique({
      where: {
          email: SubUserData.email,
        },
  })
      const UserExitPhone = await prisma.user.findFirst({
      where: {
          phone_number: SubUserData.phone_number,
        },
  })

  const SunbUserExitPhone = await prisma.subUser.findFirst({
    where: {
        phone_number: SubUserData.phone_number,
      },
})

    if(subUserExitEmail || UserExitEmail){
        throw new Error('Email already exit!')
    }
    if(UserExitPhone || SunbUserExitPhone){
      throw new Error('Phone number already exit!')
  }

    const hashedPassword = await bcrypt.hash(SubUserData.password, 10);

    if(SubUserData?.id){
      const subuser = await prisma.subUser.create({
        data: {
          id: SubUserData?.id,
          name: SubUserData.name,
          MaKhachSan: khach_san_id,
          email: SubUserData.email,
          password: hashedPassword,
          phone_number: SubUserData.phone_number,
          role: SubUserData.role,
        },
      });
    } else {
      const subuser = await prisma.subUser.create({
        data: {
          name: SubUserData.name,
          MaKhachSan: khach_san_id,
          email: SubUserData.email,
          password: hashedPassword,
          phone_number: SubUserData.phone_number,
          role: SubUserData.role,
        },
      });
    }


  
}