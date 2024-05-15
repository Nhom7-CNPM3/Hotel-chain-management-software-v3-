'use client'
import { z } from "zod";

export const formSchemaCreateHangHoatype = z.object({
    id: z.string(),
    TenHangHoa: z.string().min(1, "Vui lòng điền tên hàng hóa"),
    DonViTinh: z.string(),
    GiaGocHangHoa: z.number({
      required_error: "Vui lòng điền giá gốc"
    }),
    GiaBanHangHoa: z.number({
      required_error: "Vui lòng điền giá bán"
    }),
    SLTonKho: z.number({
      required_error: "Vui lòng điền SL Tồn"
    }),
    DinhMucTonItNhat: z.number(),
    DinhMucTonNhieuNhat: z.number(),
    MoTa: z.string(),
    GhiChu: z.string(),
    ViTri: z.string().min(1, "Vui lòng điền vị trí"),
  });