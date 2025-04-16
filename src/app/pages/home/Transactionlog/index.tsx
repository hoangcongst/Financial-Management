/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import request from "@/util/request";
import ImageIcon from "@mui/icons-material/Image";
import ImageFileSelect from "@/app/components/modal/ImageFileSelect";
const groupByDate = (transactions: any) => {
  return transactions.reduce(
    (acc: any, transaction: any) => {
      const date = dayjs(transaction.date).format("YYYY-MM-DD");
      const amount = Number(transaction.amount);
      const category = transaction.category;

      if (!acc[date]) {
        acc[date] = {
          items: [],
          totalIncome: 0,
          totalSpend: 0,
          totalLendMinus: 0,
          totalLendPlus: 0,
        };
      }
      acc[date].items.push(transaction);
      if (category === "income") {
        acc[date].totalIncome += amount;
      } else if (category === "spend") {
        acc[date].totalSpend += amount;
      } else if (category === "lend") {
        if (["Cho vay", "Cho nợ"].includes(transaction.name)) {
          acc[date].totalLendMinus += Math.abs(amount);
        } else if (["Vay nợ", "Đi vay"].includes(transaction.name)) {
          acc[date].totalLendPlus += Math.abs(amount);
        }
      }
      acc[date].total =
        acc[date].totalIncome +
        acc[date].totalSpend -
        acc[date].totalLendMinus +
        acc[date].totalLendPlus;
      return acc;
    },
    {} as Record<
      string,
      {
        items: typeof transactions;
        totalIncome: number;
        totalSpend: number;
        totalLendMinus: number;
        totalLendPlus: number;
        total: number;
      }
    >
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("vi-VN", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("vi-VN", { weekday: "long" });
  return { day, month, year, weekday };
};

const Log = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const groupedData = groupByDate(transactions);
  const sortedDates = Object.keys(groupedData).sort(
    (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
  );
  const handleFilter = async () => {
    if (!selectedDate) {
      console.log("Vui lòng chọn tháng");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        method: "GET",
        url: `/transaction_type/selected_month/${selectedDate}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModify = (id: string) => {
    const allTransactions = Object.values(groupedData).flatMap(
      (group: any) => group.items
    );
    const foundTransaction = allTransactions.find(
      (transaction: any) => transaction.id === id
    );
    setSelectedTransaction(foundTransaction);
  };

  const handleUpdate = async (id: string) => {
    console.log(selectedTransaction);
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        url: `/transaction_type/update/${id}`,
        method: "PUT",
        data: selectedTransaction,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert("Cập nhật thành công");
        await handleFilter();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        url: `/transaction_type/delete/${id}`,
        method: "DELETE",
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert("Xoá thành công");
        await handleFilter();
        setSelectedTransaction(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p_40">
        <div className="b_gw p_20 b_r20">
          <div className="f_s20">Sổ giao dịch</div>
          <div className="p_t20">
            <div className="b_gx d_f b_r15 p_10 j_cs">
              <div className="p_10 b_gw b_r15">
                <DatePicker
                  views={["year", "month"]}
                  label="Chọn tháng"
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={(date: any) => {
                    if (date) {
                      setSelectedDate(dayjs(date).format("YYYY-MM"));
                    }
                  }}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleFilter()}
                >
                  Filter
                </Button>
              </div>
              <div className="w_40 p_10 b_gw b_r15 d_f j_cs">
                <div>
                  <div>Số dư đầu</div>
                  <div>Số dư cuối</div>
                </div>
                <div>
                  <div>+(1.000.000 đ)</div>
                  <div className="b_b">+(3.000.000 đ)</div>
                  <div>+(2.000.000 đ)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p_t20 d_f j_cs">
            <div className="b_gx w_40 b_r15">
              <div className="p_10">
                <div className="b_gw b_r15 p_10">
                  <div className="scroll_spend">
                    {sortedDates.map((date) => {
                      const { day, month, year, weekday } = formatDate(date);
                      return (
                        <div key={date} className="p_t20">
                          <div className="d_f j_cs a_i p_b10 ">
                            <div className="d_f a_i">
                              <div className="f_s40">{day}</div>
                              <div className="p_l10">
                                <div>{weekday}</div>
                                <div>{`${month} ${year}`}</div>
                              </div>
                            </div>
                            <div>
                              <div>
                                {Number(groupedData[date].total).toLocaleString(
                                  "vi-VN"
                                )}{" "}
                                đ
                              </div>
                            </div>
                          </div>
                          {groupedData[date].items.map((transaction: any) => (
                            <div
                              key={transaction.id}
                              className="d_f j_cs a_i p_b10"
                              onClick={() => handleModify(transaction.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="d_f a_i">
                                <img
                                  className="s_40"
                                  src={transaction.image}
                                  alt={transaction.name}
                                />
                                <div className="p_l10">
                                  <div>{transaction.name}</div>
                                </div>
                              </div>
                              <div>
                                <div
                                  className={
                                    transaction.category === "spend" ||
                                    transaction.name === "Cho nợ" ||
                                    transaction.name === "Cho vay"
                                      ? "text_red"
                                      : "text_green"
                                  }
                                >
                                  {Number(transaction.amount).toLocaleString(
                                    "vi-VN"
                                  )}{" "}
                                  đ
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="b_gx w_56 b_r15">
              <div className="p_10">
                <div className="b_gw p_10 b_r15 h_328p ">
                  {selectedTransaction && (
                    <>
                      <div className="f_s20 t_a f_wb">Chi tiết giao dịch</div>
                      <div className="p_t20">
                        <div className="d_f a_i">
                          <img
                            src={selectedTransaction.image}
                            className="s_40"
                          />
                          <div className="p_l10">
                            {selectedTransaction.name}
                          </div>
                        </div>
                        <div className="p_t20 d_f a_i">
                          <div className="f_wb">Số tiền: </div>
                          <div className="p_l10 d_f">
                            <input
                              className="t_a"
                              type="text"
                              value={selectedTransaction.amount}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                const isNegative =
                                  selectedTransaction.category === "spend" ||
                                  ["Cho vay", "Cho nợ"].includes(
                                    selectedTransaction.name
                                  );
                                setSelectedTransaction({
                                  ...selectedTransaction,
                                  amount: isNegative ? `-${value}` : value,
                                });
                              }}
                            />
                            <div className="p_l10">VND</div>
                          </div>
                        </div>
                        <div className="p_t20 d_f a_i">
                          <div className="f_wb">Loại tiền: </div>
                          <div className="p_l10">
                            {selectedTransaction.category === "spend"
                              ? "Chi tiêu"
                              : selectedTransaction.category === "income"
                              ? "Thu nhập"
                              : "Vay/Nợ"}
                          </div>
                        </div>
                        <div className="p_t20 d_f ">
                          <div className="f_wb">Ghi chú: </div>
                          <div className="p_l10 f_1">
                            <textarea
                              className="w_100"
                              value={selectedTransaction.description}
                              onChange={(e) =>
                                setSelectedTransaction({
                                  ...selectedTransaction,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="p_t20 d_f a_i ">
                          <div className="f_wb">Hình ảnh: </div>
                          <div
                            className="b_r15 w_50 t_a d_f a_i p_l10"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenImage(true)}
                          >
                            {selectedTransaction.imageFile !== null ? (
                              <ImageIcon />
                            ) : (
                              ""
                            )}
                            <div className="p_10">
                              {selectedTransaction.imageFile === null
                                ? "Thêm hình ảnh"
                                : selectedTransaction.imageFile}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p_t20 d_f j_cs">
                        <Button
                          className="w_48"
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdate(selectedTransaction.id)}
                        >
                          Sửa
                        </Button>
                        <Button
                          className="w_48"
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(selectedTransaction.id)}
                        >
                          Xoá
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageFileSelect
        open={openImage}
        setOpen={setOpenImage}
        input={selectedTransaction}
        setInput={setSelectedTransaction}
      />
    </>
  );
};
export default Log;
