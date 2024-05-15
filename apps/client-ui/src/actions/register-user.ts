"use server";
import prisma from "../lib/prismaDb";
import * as bcrypt from "bcrypt";
import { cookies } from 'next/headers'

// Hàm tạo mật khẩu ngẫu nhiên
const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+";
  const charactersLength = 8;

  const uniqueCharacters = [...Array.from(new Set(characters))];

  let password = "";

  for (let i = 0; i < charactersLength; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueCharacters.length);
    password += uniqueCharacters[randomIndex];
  }

  return password;
};

// Hàm thiết lập cookies cho vai trò
const setRoleCookies = async (role: string, userId: string, chiNhanhId: string, khachSanId: string, path: string) => {
  const options1 = { path };
  const pass = process.env.KEY_REGISTER_EMAIL!
  // const options2: Partial<CookieOptions> = { path: '/',sameSite: 'none', secure: true };

  cookies().set("role", role, options1);
  cookies().set("user_id", userId, options1);
  cookies().set("chi_nhanh_id", chiNhanhId, options1);
  cookies().set("khach_san_id", khachSanId, options1);
};

// Hàm đăng ký người dùng
export const registerUser: any = async (userData: any) => {
  // Tìm thông tin người dùng dựa trên email
  const UserInfo = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
    select: {
      id: true,  // Chọn id
      email: true,  // Chọn email
      role: true,  // Chọn vai trò
      ChiNhanh: {
        select: {
          id: true,  // Chọn id
          TenChiNhanh: true,  // Chọn tên chi nhánh
          KhachSan: {
            select: {
              id: true,  // Chọn id
              TenKhachSan: true,  // Chọn tên khách sạn
            },
          }
        },
      }
    }
  });

  // Kiểm tra xem người dùng đã tồn tại hay chưa
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  // Nếu người dùng đã tồn tại
  if (isUserExist) {
    let userIdChiNhanh = UserInfo?.ChiNhanh[0].id ?? "";
    let userIdKhachSan = UserInfo?.ChiNhanh[0].KhachSan[0].id ?? "";
    let paths = ['/'];
    paths.map(path => {
      setRoleCookies(isUserExist.role, isUserExist.id, userIdChiNhanh, userIdKhachSan, path);
    })
    return isUserExist;
  }

  // Nếu người dùng chưa tồn tại
  if(!isUserExist){
    // Tạo mật khẩu ngẫu nhiên
    const password = generateRandomPassword();

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: "Admin",
        ChiNhanh: {
          create: {
            TenChiNhanh: "Chi Nhánh Trung Tâm",
            KhachSan: {
              create: {
                TenKhachSan: "Khách Sạn Trung Tâm",
              },
            },
          }
        }
      },
    });

    // Tìm thông tin chi nhánh và khách sạn
    const chinhanh = await prisma.tbChiNhanh.findFirst({
      where: {
        MaAdmin: user.id,
        TenChiNhanh: "Chi Nhánh Trung Tâm",
      },
      select: {
        id: true,  // Chọn id
      }
    })

    const khachsan = await prisma.tbKhachSan.findFirst({
      where: {
        MaChiNhanh: chinhanh?.id,
        TenKhachSan: "Khách Sạn Trung Tâm",
      },
      select: {
        id: true,  // Chọn id
      }
    })

    let paths = ['/'];
    paths.map(path => {
      setRoleCookies(user.role, user.id, chinhanh?.id ?? "", khachsan?.id ?? "", path);
    });

    return user;
  }
};
