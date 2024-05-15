'use client'

import { z } from "zod";

export const formSchema = z.object({
  id: z.string(),
  TienDaTra: z.number(),
});