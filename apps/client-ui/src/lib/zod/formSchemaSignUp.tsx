"use client";
import { z } from "zod";

export const formSchemaSignUp = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8characters long!"),
  phone_number: z
    .number()
    .min(10, "Phone number must be at least 11 characters!"),
});
