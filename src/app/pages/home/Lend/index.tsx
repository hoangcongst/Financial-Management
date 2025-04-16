/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { useState } from "react";
import { DatePickerV2 as DatePicker } from "@/app/components/common/DatePickerV2";
import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { TRANSACTION_TYPES } from "@/util/transaction_types";
import ImageFileSelect from "@/app/components/modal/ImageFileSelect";
import request from "@/util/request";
const Lend = () => {
  const [input, setInput] = useState<any>({
    amount: "",
    description: "",
    date: "",
    imageFile: null,
    name: "",
    image: null,
  });

  const [openImageSelect, setOpenImageSelect] = useState<boolean>(false);

  const handleSelectOption = (name: string, image: any) => {
    setInput({ ...input, name, image });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const name = input.name.toLowerCase();
      const isNegative = name.includes("cho vay") || name.includes("cho nợ");
      const amount = isNegative ? -Math.abs(input.amount) : Math.abs(input.amount);
      const formData = new FormData();
      formData.append("amount", amount.toString());
      formData.append("name", input.name);
      formData.append("image", input.image);
      formData.append("description", input.description || "");
      formData.append("category", "lend");
      formData.append("date", input.date);
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
        alert("Thêm khoản cho vay/nợ thành công!");
        setInput({
          amount: "",
          name: "",
          image: null,
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
      <div className="p_40">
        <div className="b_gw p_20 b_r20">
          <div className="f_s20">Thêm khoản cho vay/nợ</div>
          <div className="d_f p_t20 w_100 j_cs">
            <div className="w_48 b_gx b_r20 ">
              <div className="p_10 d_fc">
                <div className="p_20 b_r15 b_gw">
                  <input
                    className="b_n"
                    placeholder="Nhập số tiền"
                    value={
                      input.amount
                        ? Number(
                            input.amount.replace(/[^0-9]/g, "")
                          ).toLocaleString("vi-VN")
                        : ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      setInput({ ...input, amount: rawValue });
                    }}
                  />
                  <span className="p_l10 c_x">VND</span>
                </div>
                <div className="p_10 b_r15 m_t5 d_f a_i b_gw">
                  <img className="s_40 b_r50 b_g" src={input.image} />
                  <div className="p_l10">{input.name}</div>
                </div>
                <input
                  className="p_20 b_r15 m_t5"
                  placeholder="Thêm ghi chú"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                />
                <div className="b_gw p_10 b_r15 m_t5">
                  <DatePicker
                    className="w_100"
                    value={input.date ? dayjs(input.date) : null}
                    onChange={(date: string) => {
                      if (date) {
                        setInput({
                          ...input,
                          date: dayjs(date).format("YYYY-MM-DD"),
                        });
                      }
                    }}
                  />
                </div>
                <button
                  className="p_20 b_r15 m_t5 b_gw a_i d_f"
                  onClick={() => setOpenImageSelect(true)}
                >
                  <ImageIcon />
                  <div className="p_l10">
                    {input.imageFile === null
                      ? "Thêm hình ảnh"
                      : input.imageFile.name}
                  </div>
                </button>
              </div>
            </div>
            <div className="w_48 b_gx b_r20">
              <div className="p_10">
                <div className="scroll_spend b_r15">
                  {TRANSACTION_TYPES.map(
                    (item) =>
                      item.category === "lend" && (
                        <div
                          key={item.id}
                          className="b_gw p_10 b_r15 d_f a_i m_t5"
                          onClick={() =>
                            handleSelectOption(item.name, item.image)
                          }
                        >
                          <img className="s_40" src={item.image} />
                          <div className="p_l10">{item.name}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p_t20">
            <Button variant="contained" className="w_48" onClick={handleSave}>
              Lưu
            </Button>
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
export default Lend;
