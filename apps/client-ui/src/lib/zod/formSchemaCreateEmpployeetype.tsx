'use client'
import { z } from "zod";

export const formSchemaCreateEmpployeetype = z.object({
    id: z.string(),
    name: z.string().min(1, "Tên nhân viên phải nhiều hơn 1 ký tự"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    phone_number: z
    .number()
    .min(10, "Phone number must be at least 11 characters!"),
  });