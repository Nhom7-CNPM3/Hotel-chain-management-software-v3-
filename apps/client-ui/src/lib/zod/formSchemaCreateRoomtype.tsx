"use client";
import { z } from "zod";

export const formSchemaCreateRoomtype = z.object({
  TenPhong: z.string().min(1, "Tên phòng không được bỏ trống"),
  GhiChu: z.string(),
});