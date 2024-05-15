"use client";

import { useEffect, useRef } from "react";
import createAndSavePDF from "./createAndSavePDF";
import { SaleByProductData } from "@/types/product";
import "tailwindcss/tailwind.css";

const PdfView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const products: SaleByProductData[] = [
      {
        id: "311312415fdfsdf",
        ProductName: "Sting",
        ProductsBeenSell: "Âm nhạc",
        Revenue: 50,
        AmountToPay: "Dây đàn guitar chất lượng cao",
        ValuePaid: 500,
        NetRevenue: 500,
      },
      {
        id: "ad346f",
        ProductName: "Coca",
        ProductsBeenSell: 2,
        Revenue: 30,
        AmountToPay: 6,
        ValuePaid: 0,
        NetRevenue: 0,
      },
      {
        id: "66644hgdssda",
        ProductName: "Pepsi",
        ProductsBeenSell: 4,
        Revenue: 20,
        AmountToPay: 1,
        ValuePaid: 0,
        NetRevenue: 0,
      },
      {
        id: "34gaaddddda",
        ProductName: "7Up",
        ProductsBeenSell: "Category 4",
        Revenue: 10,
        AmountToPay: 2,
        ValuePaid: 0,
        NetRevenue: 0,
      },
    ];

    const container = containerRef.current;
  
    const runPdfProcess = async () => {
      try {
        await createAndSavePDF(products);
        if (container && typeof window !== "undefined") {
          const PSPDFKit = await import("pspdfkit");
          if (PSPDFKit) {
            (PSPDFKit as any).unload(container);
          }
          (PSPDFKit as any).load({
            container,
            document: "/document.pdf",
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
          });
        }
      } catch (error) {
        console.error("Error in PDF processing:", error);
      }
    };
  
    runPdfProcess();
  }, []);

  return (
    <>
      <div ref={containerRef} className="h-full w-[98%] ml-3" />
    </>
  );
};

export default PdfView;
