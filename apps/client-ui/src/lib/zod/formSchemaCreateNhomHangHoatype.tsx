"use client";
import { z } from "zod";

export const formSchemaCreateNhomHangHoatype = z.object({
  TenNhomHangHoa: z.string().min(1, "Tên nhóm hàng hóa không được bỏ trống"),
});