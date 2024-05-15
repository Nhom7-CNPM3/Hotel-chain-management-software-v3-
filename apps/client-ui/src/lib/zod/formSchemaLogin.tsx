'use client'

import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});
