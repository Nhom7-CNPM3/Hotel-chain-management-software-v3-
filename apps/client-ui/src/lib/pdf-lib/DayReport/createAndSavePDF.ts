"use server";

import { DayReportData } from "@/types/product";
import fs from "fs";
import path from "path";

const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createAndSavePDF = (DayReportData: DayReportData[]) => {
  return new Promise((resolve, reject) => {
    const tableBody = DayReportData.map((item) => {
      return [item.id, item.Cash.toString()];
    });
    const tableBody1 = DayReportData.map((item) => {
      return [item.id, item.Cash.toString()];
    });
    const tableBody2 = DayReportData.map((item) => {
      return [item.id, item.Cash.toString()];
    });
    const tableBody3 = DayReportData.map((item) => {
      return [item.id, item.Cash.toString()];
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
          text: "Báo cáo tổng hợp cuối ngày",
          style: "title",
          alignment: "center",
        },
        {
          text: "Chi nhánh: Chi nhánh trung tâm",
          style: "smallText",
          alignment: "center",
        },
        { text: "Tổng kết thu chi", style: "smallText" },
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
                { text: `Tổng: 2.000.000 VNĐ`, style: 'sumBackGround' },
              ],
            ],

          },
          style: "tableStyle",
        },
        { text: "Tổng kết bán hàng", style: "smallText" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Product Name", style: "labelBackground" },
                { text: "Price", style: "labelBackground" },
              ],
              ...tableBody1,
              [
                { text: "", style: 'sumBackGround' },
                { text: "", style: 'sumBackGround' },
              ],
            ],

          },
          style: "tableStyle",
        },
        { text: "Số lượng giao dịch", style: "smallText" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Product Name", style: "labelBackground" },
                { text: "Price", style: "labelBackground" },
              ],
              ...tableBody2,
              [
                { text: "", style: 'sumBackGround' },
                { text: "", style: 'sumBackGround' },
              ],
            ],

          },
          style: "tableStyle",
        },
        { text: "Hàng hóa", style: "smallText" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Product Name", style: "labelBackground" },
                { text: "Price", style: "labelBackground" },
              ],
              ...tableBody3,
              [
                { text: "", style: 'sumBackGround' },
                { text: "", style: 'sumBackGround' },
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
