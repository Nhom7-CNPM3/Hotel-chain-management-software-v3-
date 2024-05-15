"use client";

import { useEffect, useRef } from "react";
import createAndSavePDF from "./createAndSavePDF";
import { DayReportData } from "@/types/product";
import "tailwindcss/tailwind.css";

const PdfView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const products: DayReportData[] = [
      {
        id: "3132334d",
        Cash: 300,
        Transfer: "Âm nhạc",
        CreditCard: 50,
        Voucher: "Dây đàn guitar chất lượng cao",
      },
      {
        id: "3132334dee",
        Cash: 200,
        Transfer: "Category 2",
        CreditCard: 30,
        Voucher: "Description 2",
      },
      {
        id: "3132334da",
        Cash: 150,
        Transfer: "Category 3",
        CreditCard: 20,
        Voucher: "Description 3",
      },
      {
        id: "3132334dd",
        Cash: 100,
        Transfer: "Category 4",
        CreditCard: 10,
        Voucher: "Description 4",
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
