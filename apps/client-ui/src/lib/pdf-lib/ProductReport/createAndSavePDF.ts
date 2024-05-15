"use server";

import { SaleByProductData } from "@/types/product";
import fs from "fs";
import path from "path";

const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createAndSavePDF = (productData: SaleByProductData[]) => {
  return new Promise((resolve, reject) => {
    const tableBody = productData.map((item) => {
      return [item.ProductName, item.Revenue.toString()];
    });

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const documentDefinition = {
      content: [
        { text: `Ngày lập: ${formatDate(Date.now())}`, style: "smallText" },
        {
          text: "Báo cáo bán hàng theo hàng hóa",
          style: "title",
          alignment: "center",
        },
        {
          text: "Chi nhánh: Chi nhánh trung tâm",
          style: "smallText",
          alignment: "center",
        },
        { text: "(Đã phân bố giảm giá hóa đơn, giảm giá phiếu trả)",
         style: "smallText",
         alignment: "right",
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Product Name", style: "labelBackground" },
                { text: "Price", style: "labelBackground" },
              ],
              ...tableBody,
              [
                { text: "", style: 'sumBackGround' },
                { text: `$1000`, style: 'sumBackGround' },
              ],
            ],

          },
          style: "tableStyle",
        },
      ],
      styles: {
        smallText: {
          fontSize: 8,
        },
        title: {
          fontSize: 16,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        tableStyle: {
          margin: [0, 5, 0, 15],
        },
        labelBackground: {
          fillColor: "lightblue", // Màu nền của nhãn
        },
        sumBackGround: {
          fillColor: "orange", // cho màu cam
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBuffer((buffer: any) => {
      const filePath = path.join(process.cwd(), "public", "document.pdf");
      fs.writeFile(filePath, buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(filePath);
        }
      });
    });
  });
};

export default createAndSavePDF;
