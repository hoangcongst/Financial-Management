/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { useState } from "react";
import { DatePickerV2 as DatePicker } from "@/app/components/common/DatePickerV2";
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  styled,
  InputLabel,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import "@/styles/transactionbank.css";
import * as XLSX from "xlsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageFileSelect from "@/app/components/modal/ImageFileSelect";
import request from "@/util/request";
import { TRANSACTION_TYPES } from "@/util/transaction_types";
const banks = ["MBbank", "Techcombank", "Vietcombank", "BIDV", "TPBank"];
const Bank = () => {
  const [input, setInput] = useState<any>({
    amount: "",
    description: "",
    date: "",
    imageFile: null,
    name: "",
    image: "",
  });
  const [transactions, setTransactions] = useState<any>([]);
  const [openImageSelect, setOpenImageSelect] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("spend");
  const [filter, setFilter] = useState<any>({
    bank: "",
    startDate: "",
    endDate: "",
  });
  const [extentionBank, setExtentionBank] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const filterGroup = TRANSACTION_TYPES.filter(
    (item) => item.category === selectedCategory
  );

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectGpup = (image: any, name: string) => {
    setInput({ ...input, image: image, name: name });
  };
  const handleSelectOptionExcel = (id: number, money: number, date: string) => {
    setInput({ ...input, amount: money, date: date });
    setTransactions((prev: any) =>
      prev.filter((item: any) => item["STT\r\nNo"] !== id)
    );
  };

  const handleSelectOptionExtention = (
    id: number,
    amount: number,
    date: string
  ) => {
    setInput({ ...input, amount: amount, date: date });
    const selected = extentionBank.find((item: any) => item.id === id);
    setSelectedTransaction(selected);
    if (amount < 0) {
      setSelectedCategory("spend");
    } else {
      setSelectedCategory("income");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileUpLoad = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = worksheet["!ref"];
      console.log("Phạm vi dữ liệu:", range);
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        range: "A19:V30",
      });
      setTransactions(jsonData);
      console.log(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilterTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !filter.bank) return;
      const response = await request({
        method: "GET",
        url: `/transaction/user/${filter.bank}`,
        params: {
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExtentionBank(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("amount", input.amount);
      formData.append("name", input.name);
      formData.append("image", input.image);
      formData.append("description", input.description);
      formData.append("date", input.date);
      formData.append("category", selectedCategory);
      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
      const response = await request({
        method: "POST",
        url: "/transaction_type/add",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        if (selectedTransaction) {
          await request({
            method: "PATCH",
            url: `/transaction/${selectedTransaction.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        setExtentionBank((prev: any) =>
          prev.filter((item: any) => item.id !== selectedTransaction.id)
        );
        alert("Thêm giao dịch thành công!");
        setInput({
          amount: "",
          name: "",
          image: "",
          description: "",
          date: "",
          imageFile: null,
        });
      }
    } catch (error: any) {
      console.log("error detail", error.response?.data);
      console.log(error);
    }
  };

  return (
    <>
      <div className="b_gw">
        <div className="p_10">
          <div className="d_f j_cs a_i">
            <div className="">
              <Button
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}
                component="label"
              >
                <VisuallyHiddenInput
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileUpLoad}
                />
                File UpLoad
              </Button>
              &nbsp;
              <Button variant="contained" size="small">
                Tải extention
              </Button>
            </div>
            <div className="w_25">
              <FormControl className="w_100">
                <InputLabel>Bank</InputLabel>
                <Select
                  value={filter.bank}
                  onChange={(e) =>
                    setFilter({ ...filter, bank: e.target.value })
                  }
                >
                  {banks.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <DatePicker
                value={filter.startDate ? dayjs(filter.startDate) : null}
                onChange={(date: string) => {
                  if (date) {
                    setFilter({
                      ...filter,
                      startDate: dayjs(date).format("YYYY-MM-DD"),
                    });
                  }
                }}
              />
              &nbsp;
              <DatePicker
                value={filter.endDate ? dayjs(filter.endDate) : null}
                onChange={(date: string) => {
                  if (date) {
                    setFilter({
                      ...filter,
                      endDate: dayjs(date).format("YYYY-MM-DD"),
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p_40">
        <div className="b_gw p_20 b_r20">
          <div className="f_s20 d_f j_cs">
            <div>Cập nhật lịch sử giao dịch từ ngân hàng</div>
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={handleFilterTransaction}
              >
                Filter Transaction
              </Button>
            </div>
          </div>
          <div className="d_f p_t20 w_100 j_cs">
            <div className="w_40 b_gx b_r20 ">
              <div className="p_10">
                <div className="b_gw b_r15">
                  <div className="d_f">
                    <div
                      className={`p_10 w_50 t_a cate_item ${
                        selectedCategory === "spend" ? "active" : ""
                      }`}
                      onClick={() => handleSelectCategory("spend")}
                      style={{cursor: 'pointer'}}
                    >
                      Khoản chi
                    </div>
                    <div
                      className={`p_10 w_50 t_a cate_item ${
                        selectedCategory === "income" ? "active" : ""
                      }`}
                      onClick={() => handleSelectCategory("income")}
                      style={{cursor: 'pointer'}}
                    >
                      Khoản thu{" "}
                    </div>
                  </div>
                  <div className="b_tx">
                    <div className="p_10">
                      <div className="scroll_bank">
                        {filterGroup.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className="d_f a_i b_gx b_r15 m_t5"
                              onClick={() =>
                                handleSelectGpup(item.image, item.name)
                              }
                              style={{cursor: 'pointer'}}
                            >
                              <img className="s_40" src={item.image} />
                              <div className="p_l10">{item.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="b_tx ">
                    <div
                      className={`p_10 t_a cate_item ${
                        selectedCategory === "lend" ? "active" : ""
                      }`}
                      onClick={() => handleSelectCategory("lend")}
                      style={{cursor: 'pointer'}}
                    >
                      Vay/nợ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w_56 b_gx b_r20">
              <div className="p_10">
                <div className="srcoll_bank_right b_r15">
                  {transactions.length > 0 &&
                    transactions.map((item: any) => (
                      <div
                        className="b_gw p_10 b_r15 a_i m_t5"
                        onClick={() =>
                          handleSelectOptionExcel(
                            item["STT\r\nNo"],
                            parseFloat(
                              (item["Phát sinh có\r\nCredit"] || "0").replace(
                                /,/g,
                                ""
                              )
                            ) > 0
                              ? item["Phát sinh có\r\nCredit"]
                              : item["Phát sinh nợ\r\nDebit"],
                            item["Ngày giao dịch\r\nTransaction Date"]
                          )
                        }
                      >
                        <div key={item["STT\r\nNo"]}>
                          <div>Thông báo biến động số dư</div>
                          <div>
                            GD:{" "}
                            {parseFloat(
                              (item["Phát sinh có\r\nCredit"] || "0").replace(
                                /,/g,
                                ""
                              )
                            ) > 0 ? (
                              <span>+{item["Phát sinh có\r\nCredit"]}VND</span>
                            ) : (
                              <span>-{item["Phát sinh nợ\r\nDebit"]}VND</span>
                            )}{" "}
                            | {item["Ngày giao dịch\r\nTransaction Date"]} |ND:{" "}
                            {item["Nội dung\r\nDetails"]}
                          </div>
                        </div>
                      </div>
                    ))}
                  {extentionBank.length > 0 &&
                    extentionBank.map((item: any) => (
                      <div
                        className="b_gw p_10 b_r15 a_i m_t5"
                        onClick={() =>
                          handleSelectOptionExtention(
                            item.id,
                            item.amount,
                            item.date
                          )
                        }
                      >
                        <div key={item.id}>
                          <div>Thông báo biến động số dư</div>
                          <div>
                            GD: {Number(item.amount).toLocaleString("vi-VN")}{" "}
                            VND | Date: {item.date} | ND: {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p_t20 w_100">
            <div className="b_gx b_r15">
              <div className="p_10 d_f g_20">
                <div className="w_25 b_gw b_r15 d_f a_i">
                  <input
                    className="p_l10 b_n"
                    placeholder="Nhập số tiền"
                    value={
                      input.amount
                        ? Number(input.amount).toLocaleString("vi-VN")
                        : ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      setInput({ ...input, amount: rawValue });
                    }}
                  />
                  <span className="c_x">VND</span>
                </div>
                <div className="p_10 b_r15 d_f a_i b_gw w_25">
                  <img className="s_40 b_r50 b_gx" src={input.image} />
                  <div className="p_l10">{input.name}</div>
                </div>
                <input
                  className="p_10 b_r15 w_25 b_n"
                  placeholder="Ghi chú"
                  value={input.description}
                  onChange={(e) => {
                    setInput({ ...input, description: e.target.value });
                  }}
                />
                <div className="">
                  <Button
                    variant="contained"
                    size="small"
                    className=""
                    onClick={handleSave}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
              <div className="p_l10 p_r10 p_b10 d_f g_20">
                <div className="b_gw p_10 b_r15 w_25 d_f j_c">
                  <DatePicker
                    value={input.date ? dayjs(input.date) : null}
                    onChange={(date: string) => {
                      if (date) {
                        setInput({
                          ...input,
                          date: dayjs(date).format("YYYY-MM-DD HH:mm"),
                        });
                      }
                    }}
                  />
                </div>
                <button
                  className="p_20 b_r15 m_t5 b_gw a_i d_f w_25"
                  onClick={() => setOpenImageSelect(true)}
                >
                  {input.imageFile !== null ? <ImageIcon /> : ""}
                  <div className="p_l10">
                    {input.imageFile === null
                      ? "Thêm hình ảnh"
                      : input.imageFile.name}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageFileSelect
        open={openImageSelect}
        setOpen={setOpenImageSelect}
        input={input}
        setInput={setInput}
      />
    </>
  );
};
export default Bank;
