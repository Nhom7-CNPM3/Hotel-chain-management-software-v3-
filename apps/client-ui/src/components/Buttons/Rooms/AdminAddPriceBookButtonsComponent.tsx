"use client";

import AdminAddPriceBookButtons from "@/lib/antd/AdminAddPriceBookButtons";
import React, { useState } from "react";
import styles from "@/utils/style";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdClose, MdBlock } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { Popover, DatePicker, Select } from "antd";
import type { GetProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RangeValue } from "rc-picker/lib/interface";
import { BsTrash } from "react-icons/bs";

// Types
type OpenType = "PriceBook";
type ButtonNavActiveType = "ThongTin" | "ChiTietGiaPhong";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
//

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

// Main Function
const AdminAddPriceBookButtonsComponent = () => {
  const [open, setOpen] = useState<OpenType | "screen">("screen");
  const [buttonNavActive, setButtonNavActive] =
    useState<ButtonNavActiveType>("ThongTin");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "Sample 1", type: "Type 1", price: 100 }, 
    { id: 2, name: "Sample 2", type: "Type 2", price: 150 },
    // Insert 30 sample data here
    { id: 3, name: "Sample 3", type: "Type 3", price: 200 },
    { id: 4, name: "Sample 4", type: "Type 4", price: 250 },
    { id: 5, name: "Sample 5", type: "Type 5", price: 300 },
    { id: 6, name: "Sample 6", type: "Type 6", price: 350 },
    { id: 7, name: "Sample 7", type: "Type 7", price: 400 },
    { id: 8, name: "Sample 8", type: "Type 8", price: 450 },
    { id: 9, name: "Sample 9", type: "Type 9", price: 500 },
    { id: 10, name: "Sample 10", type: "Type 10", price: 550 },
    { id: 11, name: "Sample 11", type: "Type 11", price: 600 },
    { id: 12, name: "Sample 12", type: "Type 12", price: 650 },
    { id: 13, name: "Sample 13", type: "Type 13", price: 700 },
    { id: 14, name: "Sample 14", type: "Type 14", price: 750 },
    { id: 15, name: "Sample 15", type: "Type 15", price: 800 },
    { id: 16, name: "Sample 16", type: "Type 16", price: 850 },
    { id: 17, name: "Sample 17", type: "Type 17", price: 900 },
    { id: 18, name: "Sample 18", type: "Type 18", price: 950 },
    { id: 19, name: "Sample 19", type: "Type 19", price: 1000 },
    { id: 20, name: "Sample 20", type: "Type 20", price: 1050 },
    { id: 21, name: "Sample 21", type: "Type 21", price: 1100 },
    { id: 22, name: "Sample 22", type: "Type 22", price: 1150 },
    { id: 23, name: "Sample 23", type: "Type 23", price: 1200 },
    { id: 24, name: "Sample 24", type: "Type 24", price: 1250 },
    { id: 25, name: "Sample 25", type: "Type 25", price: 1300 },
    { id: 26, name: "Sample 26", type: "Type 26", price: 1350 },
    { id: 27, name: "Sample 27", type: "Type 27", price: 1400 },
    { id: 28, name: "Sample 28", type: "Type 28", price: 1450 },
    { id: 29, name: "Sample 29", type: "Type 29", price: 1500 },
    { id: 30, name: "Sample 30", type: "Type 30", price: 1550 },
  ]);



  // Giá trị từ database
  const dataValue = [{ value: "jack" }, { value: "lucy" }, { value: "tom" }];
  //

  // Hàm xử lý thanh Select trong form Thêm phòng mới
  const isUpperCase = (str: string) =>
    str.charAt(0) === str.charAt(0).toUpperCase();

  const dataWithLabelAndValue = dataValue.map((item) => ({
    value: item.value,
    label: isUpperCase(item.value) ? item.value.toLowerCase() : item.value,
  }));
  //

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearchSelect = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Popup icon content
  const content = (
    <div>
      <p>
        Bạn có thể chọn giữa việc tự nhập mã hay để hệ thống chúng tôi tự cấp mã
        cho bạn bằng các dãy kí tự ngẫu nhiên
      </p>
    </div>
  );

  //   Hàm xử lý DatePicker
  const handleDatePickerChange = (
    values: RangeValue<Dayjs>,
    dateStrings: [string, string]
  ) => {
    setDayStart(dateStrings[0]); // Save the start date value to dayStart variable
    setDayEnd(dateStrings[1]); // Save the end date value to dayEnd variable
  };

  const handleDeleteDetailPrice = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, dataId: number) => {
    event.preventDefault();
    setData(data.filter(item => item.id !== dataId));
  }

  return (
    <>
      <AdminAddPriceBookButtons setOpen={setOpen} />

      {open === "PriceBook" && (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-50 backdrop-brightness-50">
          <div className="h-full grid place-content-center">
            <div className="bg-gray-200 w-[800px] h-[400px] rounded-lg mx-16 -translate-y-28 shadow-lg">
              <div className="my-4 mx-6 flex justify-between">
                <h3 className="text-gray-800 font-bold">Thêm bảng giá phòng</h3>
                <button onClick={() => setOpen("screen")}>
                  <MdClose className="text-gray-700 hover:text-red-600" />
                </button>
              </div>
              <div className="h-full">
                {/* Top Form */}
                <div className="bg-gray-200 w-full">
                  <button
                    onClick={() => setButtonNavActive("ThongTin")}
                    className={`px-3 py-2 ${
                      buttonNavActive === "ThongTin"
                        ? "border-b-green-500 border-b-large text-black"
                        : ""
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Thông tin
                  </button>
                  <button
                    onClick={() => setButtonNavActive("ChiTietGiaPhong")}
                    className={`px-3 py-2 ${
                      buttonNavActive === "ChiTietGiaPhong"
                        ? "border-b-green-500 border-b-large text-black"
                        : ""
                    } hover:border-b-green-500 hover:border-b-large hover:text-black text-gray-500 font-bold`}
                  >
                    Chi tiết giá phòng
                  </button>
                </div>

                {/* Bottom Form */}
                <div className="h-full bg-white py-10 px-3">
                  <form className="flex flex-col gap-4">
                    {buttonNavActive === "ThongTin" ? (
                      <div className="flex flex-col gap-4 min-h-[278px]">
                        <div className="flex items-center">
                          <label
                            htmlFor="maBangGia"
                            className={`${styles.formlabel} flex gap-1`}
                          >
                            Mã bảng giá:
                            <Popover content={content} title="Lưu ý!">
                              <PiWarningCircleFill className="size-5 text-gray-500" />
                            </Popover>
                          </label>
                          <input
                            type="text"
                            id="maBangGia"
                            name="maBangGia"
                            placeholder="Mã hạng phòng tự dộng"
                            className={`${styles.formInput} w-[80%]`}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="tenBangGia"
                            className={`${styles.formlabel}`}
                          >
                            Tên bảng giá:
                          </label>
                          <input
                            type="text"
                            id="tenBangGia"
                            name="tenBangGia"
                            className={`${styles.formInput} w-[80%]`}
                          />
                        </div>

                        <div className="flex items-center">
                          <label className={`${styles.formlabel}`}>
                            Hiệu lực:
                          </label>
                          <RangePicker
                            disabledDate={disabledDate}
                            disabledTime={disabledRangeTime}
                            onChange={handleDatePickerChange}
                            placement="bottomRight"
                            showTime={{
                              hideDisabledOptions: true,
                              defaultValue: [
                                dayjs("00:00:00", "HH:mm:ss"),
                                dayjs("11:59:59", "HH:mm:ss"),
                              ],
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                            className={`${styles.formInput} w-[80%]`}
                          />
                        </div>

                        <div className="flex items-center">
                          <label
                            htmlFor="ghiChu"
                            className={`${styles.formlabel}`}
                          >
                            Ghi chú:
                          </label>
                          <input
                            type="text"
                            id="ghiChu"
                            name="ghiChu"
                            className={`${styles.formInput} w-[80%]`}
                          />
                        </div>
                      </div>
                    ) : null}

                    {buttonNavActive === "ChiTietGiaPhong" ? (
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center w-full">
                          <Select
                            showSearch
                            placeholder="Thêm hạng phòng vào bảng giá"
                            optionFilterProp="children"
                            onChange={onChangeSelect}
                            onSearch={onSearchSelect}
                            filterOption={filterOption}
                            options={dataWithLabelAndValue.map((option) => ({
                              label: option.label,
                              value: option.value,
                            }))}
                            className={`${styles.formInput} px-2 w-full`}
                          />
                        </div>
                        <div className="h-[230px] overflow-y-auto text-gray-700">
                          <div className="w-full">
                              <table className="w-full">
                                <thead className="w-full">
                                  <tr className="bg-blue-500 sticky top-0">
                                    <th></th>
                                    <th>Hạng phòng</th>
                                    <th>Loại giá</th>
                                    <th>Mức giá</th>
                                  </tr>
                                </thead>
                            {data.length > 0 && (
                                <tbody className="w-full overflow-auto">
                                {data.map((item, index) => (
                                  <tr key={index} className="divide-y-3 w-full">
                                    <td>
                                      <button 
                                      onClick={(e) => handleDeleteDetailPrice(e, item.id)}
                                      >
                                        <BsTrash className='text-gray-700 hover:text-red-500 size-5' />
                                        </button>
                                      </td>
                                    <td>
                                      {item.id }
                                      {item.name }
                                      </td>
                                    <td>
                                      <div className="space-y-6">
                                     <p>Mỗi giờ</p> 
                                     <p>Mỗi ngày</p> 
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex flex-col gap-2 pb-2">
                                      <input type="text" className={`${styles.formInput}`}/>
                                      <input type="text" className={`${styles.formInput}`}/>
                                      </div>
                                      </td>
                                  </tr>
                                ))}
                                </tbody>
                                )}
                              </table>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* Button Submit Group */}
                    <div className="flex justify-end pr-5 gap-2">
                      <button type="submit" className={`${styles.formbtn}`}>
                        <span className="h-full grid place-content-center">
                          <IoMdSave className="size-4 hover:text-gray-500" />
                        </span>
                        <span>Lưu</span>
                      </button>
                      <button type="submit" className={`${styles.formbtn}`}>
                        <span className="h-full grid place-content-center">
                          <IoMdSave className="size-4 hover:text-gray-500" />
                        </span>
                        <span>Lưu & Thêm mới</span>
                      </button>
                      <button
                        onClick={() => setOpen("screen")}
                        type="button"
                        className={`${styles.formbtnClose}`}
                      >
                        <span className="h-full grid place-content-center">
                          <MdBlock className="size-4 hover:text-red-500" />
                        </span>
                        <span>Bỏ qua</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddPriceBookButtonsComponent;
