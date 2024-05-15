"use client";
import { z } from "zod";

export const formSchemaCreateRoomSubtype = z.object({
  TenNhomKhuVuc: z.string().min(1, "Tên khu vực không được bỏ trống"),
  GhiChu: z.string(),
});