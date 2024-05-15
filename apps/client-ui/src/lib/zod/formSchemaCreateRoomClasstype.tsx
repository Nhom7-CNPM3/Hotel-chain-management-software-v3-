"use client";
import { z } from "zod";

export const formSchemaCreateRoomClasstype = z.object({
  MaLoaiPhong: z.string(),
  TenLoaiPhong: z.string().min(2, "Tên phòng phải nhiều hơn 2 ký tự"),
  GiaTheoGio: z
  .number()
  .min(1000, "Vui lòng nhập giá tiền không dưới 1000 VNĐ!"),
  GiaTheoNgay: z
  .number()
  .min(1000, "Vui lòng nhập giá tiền không dưới 1000 VNĐ"),
});