'use server'

import prisma from "@/lib/prismaDb"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

export default async function getSubUserByEmailAndPass(loginData: any){

    const Subuser = await prisma.subUser.findUnique({
        where: {
          email: loginData.email,
        },
      });

      if (Subuser && bcrypt.compareSync(loginData.password, Subuser.password)) {
              const accessToken = jwt.sign({ email: Subuser.email, role: 'access' }, 'your_access_secret_key', { expiresIn: '15m' });

      // Create a refresh token with expiration time
      const refreshToken = jwt.sign({ email: Subuser.email, role: 'refresh' }, 'your_refresh_secret_key', { expiresIn: '7d' });
  
      // Set the access token in a cookie
      cookies().set("access_token", accessToken);
      
      // Set the refresh token in a cookie
      cookies().set("refresh_token", refreshToken);

      cookies().set("user_id", Subuser.id);

      cookies().set("role", Subuser.role);

      cookies().set("khach_san", Subuser.MaKhachSan ?? "");

        return Subuser
      } else {
        throw new Error('Email hoặc mật khẩu không đúng!')
      }
}