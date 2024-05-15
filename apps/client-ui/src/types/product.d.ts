import { Decimal } from "@prisma/client/runtime/library";
import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DayReportData = {
  id: string | number;
  Cash: string | number;
  Transfer: string | number;
  CreditCard: string | number;
  Voucher: string | number;
  // NumberOfTransactions: number;
  // NumberOfItems: number;
  // NumberOfProducts: number;
};

export type SaleByProductData = {
  id: number | string;
  ProductName: string;
  ProductsBeenSell: string | number;
  Revenue: number | string;
  AmountToPay: number | string;
  ValuePaid: number | string;
  NetRevenue: number | string;
};

export type TbCacLinkAnhPhongCreateInput = {
  MaPhong: string;
  LinkAnh: string;
}

export type HangHoaPurchasesOrderWithslTon = {
  id: string;
  TenHangHoa: string;
  DonViTinh: string | null;
  GiaGocHangHoa: Decimal;
  SLTonKho: number;
  slTon: number;
}

export type HangHoaPurchasesOrder = {
  id: string;
  TenHangHoa: string;
  DonViTinh: string | null;
  GiaGocHangHoa: Decimal;
  SLTonKho: number;
}
