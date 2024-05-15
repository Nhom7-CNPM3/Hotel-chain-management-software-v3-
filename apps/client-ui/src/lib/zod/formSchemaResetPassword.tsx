"use client";
import { z } from "zod";

export const formSchemaResetPassword: any = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long!"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must need to match!",
      path: ["confirmPassword"],
    }
  );
