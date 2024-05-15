'use client'
import { z } from "zod";

export const formSchemaUpdateHangHoatype = z.object({
    TenHangHoa: z.string().min(1, "Vui lòng điền tên hàng hóa"),
    DonViTinh: z.string(),
    // MaNhomHangHoa: z.string(),
    // GiaGocHangHoa: z.number({
    //   required_error: "Vui lòng điền giá gốc"
    // }),
    // GiaBanHangHoa: z.number({
    //   required_error: "Vui lòng điền giá bán"
    // }),
    // SLTonKho: z.number({
    //   required_error: "Vui lòng điền SL Tồn"
    // }),
    MoTa: z.string(),
    GhiChu: z.string(),
    ViTri: z.string(),
    TrongLuong: z.string(),
  });