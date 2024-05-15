'use client'

import { z } from "zod";

export const formSchemaForgotPassword = z.object({
  email: z.string().email(),
});
